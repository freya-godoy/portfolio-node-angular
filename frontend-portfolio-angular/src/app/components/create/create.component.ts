import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})

export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;
  public save_project: any;
  public status: string; // 'success', 'failed'
  public filesToUpload: Array<File>;
  public url: string;

  constructor(
    private projectService: ProjectService,
    private uploadService: UploadService
  ) {
    this.title = "crear proyecto";
    this.project = new Project('', '', '', '', 2022, '', '');
    this.status = '';
    this.filesToUpload = [];
    this.url = Global.url;
  }

  ngOnInit() {

  }

  onSubmit(form: any) {
    console.log(this.project);
    this.projectService.saveProject(this.project).subscribe(
      Response => {
        if (Response.project) {


          // Subir la imagen
          if (this.filesToUpload.length) {
            this.uploadService.makeFileRequest(Global.url + "upload-image/" + Response.project._id, [], this.filesToUpload, 'image')
              .then((result: any) => {
                this.save_project = result.project;
                this.status = 'success';
                form.reset();
              });
          } else {
            this.save_project = Response.project;
            this.status = 'success';
            form.reset();
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
    this.filesToUpload = fileInput.target.files;
  }

}

