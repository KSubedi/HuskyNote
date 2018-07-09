import { Routes } from '@angular/router';
import { NotesListComponent } from '../components/notes-list/notes-list.component';
import { RecycleBinComponent } from '../components/recycle-bin/recycle-bin.component';
import { SettingsComponent } from '../components/settings/settings.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';

// All routes go here
export const ngRoutes: Routes = [
	{
        path: "",
        redirectTo: "notes", 
        pathMatch: "full"
    },
    {
        path: "notes/:notesPath",
        component: NotesListComponent,
        pathMatch: "full"
    },
    {
        path: "notes",
        component: NotesListComponent
    },
	{
		path: "recycle-bin",
		component: RecycleBinComponent
	},
	{
		path: "settings",
		component: SettingsComponent
    },
    {
        path: "**",
        component: NotFoundComponent
    }
];