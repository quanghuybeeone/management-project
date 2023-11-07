import { Component, ViewChild, ElementRef, Renderer2, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ConfigService } from '../../../../services/config.service';
import { Project } from '../../project';
import { AuthService } from 'src/app/services/auth.service';

interface Member {
  _id: string;
  name: string;
}

@Component({
  selector: 'app-addnewproject',
  templateUrl: './addnewproject.component.html',
  styleUrls: ['./addnewproject.component.css'],
})
export class AddnewprojectComponent implements OnInit {
  @Output() onProjectAdded: EventEmitter<any> = new EventEmitter();
  members = new FormControl();

  apiUrl: string;
  imageUrl: string;

  @ViewChild('modal') modal!: ElementRef;

  constructor(private toastr: ToastrService, private renderer: Renderer2, private http: HttpClient, private configService: ConfigService,private authService: AuthService) {
    this.apiUrl = this.configService.getApiUrl();
    this.imageUrl = this.configService.getImageUrl();
    this.newProject.members = []
  }

  ngOnInit() {

  }

  openModal() {
    this.renderer.setStyle(this.modal.nativeElement, 'display', 'block');
  }

  closeModal() {
    this.renderer.setStyle(this.modal.nativeElement, 'display', 'none');
  }

  file: File | null = null;

  newProject:Project = <Project>{}

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const selectedFile: File = event.target.files[0];
      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      const fileName = `${timestamp}_${selectedFile.name}`;

      // Create a new File object with the updated file name
      this.file = new File([selectedFile], fileName, { type: selectedFile.type });
      this.newProject.img = fileName;
      console.log('Selected file:', this.file);
    } else {
      this.file = null;
      this.newProject.img = '';
      console.log('No file selected.');
    }
  }

  handleMembersChange(updatedMembers: Member[]): void {
    this.newProject.members = updatedMembers;
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
          this.createNewProject();
        },
        (error) => {
          console.log('File upload error:', error);
        }
      );
    } else {
      this.createNewProject();
    }
  }

  createNewProject() {
    const leader = this.authService.getUser()
    if(leader){
      this.newProject.leader = leader
    }
    console.log(this.newProject);
    this.http.post(`${this.apiUrl}projects`, this.newProject).subscribe(
      (response) => {
        this.closeModal()
        this.toastr.success('Thêm mới dự án thành công!', 'Success');
        this.onProjectAdded.emit();
        this.file = null

        this.newProject = <Project>{}
        this.newProject.members = []
        if(leader){
          this.newProject.leader = leader
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }



}
