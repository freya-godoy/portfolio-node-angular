import { Component, OnInit } from "@angular/core";
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})

export class EditComponent implements OnInit {

  public title: string;
  public project: Project;
  public save_project: any;
  public status: string; // 'success', 'failed'
  public filesToUpload: Array<File>;
  public url: string;
  constructor(
    private projectService: ProjectService,
    private uploadService: UploadService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.title = "Editar-proyecto";
    this.status = '';
    this.filesToUpload = [];
    this.project = <any>Response;
    this.url = Global.url;
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
        this.project = response.project;
      },
      error => {
        console.log(<any>error);
      }
    )
  }
  onSubmit() {
    this.projectService.updateProject(this.project).subscribe(
      response => {
        if (response.project) {

          // Subir la imagen
          if (this.filesToUpload) {
            this.uploadService.makeFileRequest(Global.url + "upload-image/" + response.project._id, [], this.filesToUpload, 'image')
              .then((result: any) => {
                this.save_project = result.project;
                this.status = 'success';
              });
          } else {
            this.save_project = response.project;
            this.status = 'success';
          }

        } else {
          this.status = 'failed';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}

