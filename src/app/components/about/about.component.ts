import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../router.animation';
import { MessageService } from '../../services/message.service';
import { Message } from '../../model/message';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class AboutComponent implements OnInit {

  constructor(private ms:MessageService) { }

  ngOnInit() {
  }

  onSubmit(formData) {
    if(formData.valid) {
      this.ms.push(new Message(formData.value.name, formData.value.email, formData.value.message));
      this.toast();
    }
    formData.reset();
  }

  toast() {
      var x = document.getElementById("snackbar")
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
  }

}
