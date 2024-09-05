import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { VideoComponent } from './video/video.component';
import { ModalComponent } from './modal/modal.component';
import { AlertComponent } from './alert/alert.component';
import { ToastComponent } from './toast/toast.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { FloatingChatComponent } from './floating-chat/floating-chat.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    VideoComponent
  ],
  declarations: [
    ModalComponent,
    ForbiddenComponent,
    ChatbotComponent,
    FloatingChatComponent
  ],
  exports: [
    ModalComponent, 
    FloatingChatComponent
  ]
})
export class ComponentsModule { }
