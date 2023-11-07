import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, ViewChild, inject, Output, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../../services/config.service';
import { Project } from '../../project';

interface Member {
  _id: string;
  name: string;
}

@Component({
  selector: 'app-select-member',
  templateUrl: './select-member.component.html',
  styleUrls: ['./select-member.component.css']
})
export class SelectMemberComponent implements OnInit{
  @Input() projectId!: string;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  memberCtrl = new FormControl('');
  filteredMembers: Observable<Member[]>;
  @Input() members: Member[] = [];
  @Output() membersChange = new EventEmitter<Member[]>();
  allMembers: Member[] = [];

  @ViewChild('memberInput') memberInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);
  apiUrl: string;
  imageUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = this.configService.getApiUrl();
    this.imageUrl = this.configService.getImageUrl();

    this.filteredMembers = this.memberCtrl.valueChanges.pipe(
      startWith(null),
      map((member: string | null) => (member ? this._filter(member) : this.allMembers.slice()))
    );
  }

  ngOnInit(): void {
    this.loadAllMembers();
  }

  showAutocompleteList(): void {
    this.memberCtrl.setValue('');
  }

  loadAllMembers() {
    if(this.projectId){
    this.http.get<Project>(`${this.apiUrl}projects/find/${this.projectId}`).subscribe(
      (response) => {
        this.allMembers = response.members;
      },
      (error) => {
        console.error('Failed to load members from API:', error);
      }
    );
    }else{
      this.http.get<Member[]>(`${this.apiUrl}users/members`).subscribe(
        (response) => {
          this.allMembers = response;
        },
        (error) => {
          console.error('Failed to load members from API:', error);
        }
      );
    }

  }

  remove(member: Member): void {
    const index = this.members.indexOf(member);

    if (index >= 0) {
      this.members.splice(index, 1);
      this.announcer.announce(`Removed ${member.name}`);
    }
    this.membersChange.emit(this.members);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // console.log(event.option.value);

    const newMember: Member = { _id: event.option.value._id, name: event.option.value.name };
    // console.log(newMember);

    this.members.push(newMember);
    this.memberInput.nativeElement.value = '';
    this.memberCtrl.setValue(null);
    this.membersChange.emit(this.members);
  }

  private _filter(value: any): Member[] {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();

      return this.allMembers.filter((member) => {
        const memberName = member.name.toLowerCase();
        return memberName.includes(filterValue);
      });
    } else {
      return [];
    }
  }

  isMemberSelected(member: Member): boolean {
    return this.members.some((m) => {
      return m._id === member._id
    }
    );
  }
}
