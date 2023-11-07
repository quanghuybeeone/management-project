import { Component, ViewChild, ElementRef, Renderer2, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ConfigService } from '../../../../services/config.service';
import { Project, Member } from '../../project';

@Component({
  selector: 'app-editproject',
  templateUrl: './editproject.component.html',
  styleUrls: ['./editproject.component.css'],
})
export class EditprojectComponent implements OnInit {
  @Input() idproject: string | undefined;
  @Output() onProjectEdit: EventEmitter<any> = new EventEmitter();
  members:FormControl = new FormControl();

  apiUrl: string;
  imageUrl: string;

  @ViewChild('modal') modal!: ElementRef;

  constructor(private toastr: ToastrService, private renderer: Renderer2, private http: HttpClient,private datePipe: DatePipe, private configService: ConfigService) {
    this.apiUrl = this.configService.getApiUrl();
    this.imageUrl = this.configService.getImageUrl();
  }

  ngOnInit() {
  }


  fetchProjectDetails() {
    if (this.idproject) {
      this.http.get<Project>(`${this.apiUrl}projects/find/${this.idproject}`).subscribe(
        (response) => {
          this.project = {
            _id: response._id,
            name: response.name,
            img: response.img,
            leader: response.leader,
            members: response.members,
            description: response.description,
            dateStart: this.datePipe.transform(response.dateStart, 'yyyy-MM-dd'),
          };
          this.members = new FormControl(this.project.members);
          console.log(this.project.members);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  openModal() {
    this.renderer.setStyle(this.modal.nativeElement, 'display', 'block');
    this.fetchProjectDetails();
  }

  closeModal() {
    this.renderer.setStyle(this.modal.nativeElement, 'display', 'none');
  }

  handleMembersChange(updatedMembers: Member[]): void {
    this.project.members = updatedMembers;
  }

  file: File | null = null;

  project:Project = <Project>{}

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const selectedFile: File = event.target.files[0];
      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      const fileName = `${timestamp}_${selectedFile.name}`;

      this.file = new File([selectedFile], fileName, { type: selectedFile.type });
      this.project.img = fileName;
      console.log('Selected file:', this.file);
    } else {
      this.file = null;
      this.project.img = '';
      console.log('No file selected.');
    }
  }

  onSubmit() {
    if (this.file) {
      const formData = new FormData();
      formData.append('one_image', this.file);

      this.http.post(`${this.apiUrl}file/upload`, formData, {
        headers: new HttpHeaders(),
      }).subscribe(
        (response) => {
          console.log('File uploaded:', response);
          this.editProject();
        },
        (error) => {
          console.log('File upload error:', error);
        }
      );
    } else {
      this.editProject();
    }


  }
  editProject(){
    if (this.idproject) {
      this.http.put(`${this.apiUrl}projects/${this.idproject}`, this.project).subscribe(
        (response) => {
          console.log(response);
          this.closeModal();
          this.toastr.success('Cập nhật thông tin dự án thành công!', 'Success');
          this.onProjectEdit.emit();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
