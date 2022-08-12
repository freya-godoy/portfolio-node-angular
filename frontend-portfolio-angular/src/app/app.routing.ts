//importar modulos 
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
// importo mi component
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from "./components/detail/detail.component";
import { EditComponent } from "./components/edit/edit.component";
// Definir rutas
//arrat de objetos
const appRoutes: Routes = [
    { path: '', component: AboutComponent },
    { path: 'sobre-mi', component: AboutComponent },
    { path: 'proyectos', component: ProjectsComponent },
    { path: 'crear-proyecto', component: CreateComponent },
    { path: 'contacto', component: ContactComponent },
    { path: 'proyecto/:id', component: DetailComponent},
    { path: 'editar-proyecto/:id', component: EditComponent},
    { path: '**', component: AboutComponent }
];
//exportar configuracion de rutas 
export const AppRoutingProviders: any[] = [];
export const Routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);