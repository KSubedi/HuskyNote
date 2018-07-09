import { AddNoteComponent } from './components/dialogs/add-note/add-note.component';
import { ApiService } from './services/api.service';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoadingIndicatorComponent } from './components/common/loading-indicator/loading-indicator.component';
import { LoadingService } from './services/loading.service';
import { LogoComponent } from './components/logo/logo.component';
import { NgModule } from '@angular/core';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NoteWindowComponent } from './components/note-window/note-window.component';
import { RecycleBinComponent } from './components/recycle-bin/recycle-bin.component';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
import { TitleBarComponent } from './components/title-bar/title-bar.component';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';

import { ngRoutes } from "./config/routes";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ModalComponent } from './components/common/modal/modal.component';
import { ModalDirective } from './directives/modal.directive';
import { DialogDirective } from './directives/dialog.directive';
import { AddChooserComponent } from './components/dialogs/add-chooser/add-chooser.component';
import { AddCategoryComponent } from './components/dialogs/add-category/add-category.component';
import { ChangeCategoryComponent } from './components/dialogs/change-category/change-category.component';
import { NotificationComponent } from './components/common/notification/notification.component';

@NgModule({
    declarations: [
        AppComponent,
        NoteWindowComponent,
        NotesListComponent,
        LogoComponent,
        TitleBarComponent,
        ToolBarComponent,
        AddNoteComponent,
        RecycleBinComponent,
        SettingsComponent,
        LoadingIndicatorComponent,
        NotFoundComponent,
        ModalComponent,
        ModalDirective,
        DialogDirective,
        AddChooserComponent,
        AddCategoryComponent,
        ChangeCategoryComponent,
        NotificationComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(ngRoutes, { enableTracing: false }),
        FormsModule,
        HttpClientModule
    ],

    providers: [
        ApiService,
        LoadingService
    ],
    entryComponents: [
        AddNoteComponent,
        AddCategoryComponent,
        AddChooserComponent,
        ChangeCategoryComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
