import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params, RouteReuseStrategy } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {
  public url: string;
  public project: Project;
  public confirm: boolean;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.url = Global.url;
    this.project = <any>Response;
    this.confirm = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['id'];

      this.getProject(id);
    });

  }

  getProject(id: any) {

    this.projectService.getProject(id).subscribe(
      response => {
        console.log("response", response);
        this.project = response.project;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  setConfirm(confirm: any) {
    this.confirm = confirm;
  }

  deleteProject(id: any) {
    this.projectService.deleteProject(id).subscribe(
      response => {
        if (response.project) {
          this.router.navigate(['/proyectos']);
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }


}
