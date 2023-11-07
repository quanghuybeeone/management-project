import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Project } from '../projects/project';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-projectdetail',
  templateUrl: './projectdetail.component.html',
  styleUrls: ['./projectdetail.component.css']
})
export class ProjectdetailComponent implements OnInit {
  id: string = '';
  project:Project = <Project>{};
  backlog: any[] = [];
  inProgress: any[] = [];
  reviewCode: any[] = [];
  testing: any[] = [];
  done: any[] = [];

  user: any;

  constructor(private route: ActivatedRoute, private http: HttpClient,private toastr: ToastrService,private authService: AuthService) {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam !== null ? idParam : '';
    this.loadProject();
    this.user = this.authService.getUser();

  }

  isUserMember(user: any): boolean {
    return this.project.members?.some(member => member._id === user._id);
  }

  ngOnInit() {
    this.loadTasksByStatus('backlog', this.backlog);
    this.loadTasksByStatus('in progress', this.inProgress);
    this.loadTasksByStatus('review code', this.reviewCode);
    this.loadTasksByStatus('testing', this.testing);
    this.loadTasksByStatus('done', this.done);
  }

  loadProject() {
    const url = `http://localhost:7777/api/projects/find/${this.id}`;
    this.http.get<Project>(url).subscribe(
      (response) => {
        this.project = response;
      },
      (error) => {
        console.error('Lỗi khi gọi API:', error);
      }
    );
  }

  loadTasksByStatus(status: string, targetArray: any[]) {
    const url = `http://localhost:7777/api/tasks?projectId=${this.id}&status=${status}`;
    this.http.get<any[]>(url).subscribe(
      (response) => {
        targetArray.length = 0;
        targetArray.push(...response);
        // console.log(targetArray);
      },
      (error) => {
        console.error('Error calling API:', error);
      }
    );
  }

  drop(event: CdkDragDrop<any[], any[], any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const droppedTask = event.container.data[event.currentIndex];
      const taskId = droppedTask._id;
      // console.log(taskId);

      const url = `http://localhost:7777/api/tasks/${taskId}`;
      const newStatus = event.container.element.nativeElement.getAttribute('status');
      // console.log(url);
      // console.log(newStatus);
      this.http.put(url, { status: newStatus }).subscribe(
        (response) => {
          this.toastr.success('Task status updated!', 'Success')
        },
        (error) => {
          console.error('Error updating task status:', error);
        }
      );
    }
  }
}
