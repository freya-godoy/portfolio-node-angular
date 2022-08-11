import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  public projects : Project[];
  public url: string;

  constructor(
    private projectService: ProjectService,
  ) {
    this.projects = [];
    this.url = Global.url;
   }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.projectService.getProjects().subscribe(
      Response => {
        if(Response.projects){
          this.projects = Response.projects;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

}
