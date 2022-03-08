import { List } from './../list';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Guid } from "guid-typescript";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  public input: string = '';
  public listTweet: List[] = [];
  public form: any;
  public showModal: boolean = false;
  @ViewChild('deleteModal') deleteModal: any;

  public selectTweet: List[] = [];
  modalRef?: BsModalRef;
  public deleteModalRef?: BsModalRef;

  public today: number = Date.now();
  public hiddenDate: boolean = false;


  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    this.showData();
    this.form = new FormGroup({
      listId: new FormControl(),
      text: new FormControl(),
      isList: new FormControl(),
    });
  }

  public newTweet(): void {
    this.form.value.listId = Guid.create().toString();
    this.form.value.isList = false;

    let index = this.listTweet.length;
    this.form.value.id = index;


    const list: List = this.form.value;
    this.listTweet.push(list);

    localStorage.setItem("BD", JSON.stringify(this.listTweet))
    this.form.reset();

    this.sendNewTweet();
  }

  public sendNewTweet(): void {
    this.input = '';
  }

  public showData(): void {
    if (localStorage.getItem('BD')) {
      this.listTweet = JSON.parse(localStorage.getItem('BD') || '[]');
    } else {
      this.listTweet = []
    }

  }

  public deleteTweet(listPost: any): void {
    this.selectTweet = listPost;
    this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' })
  }

  public onConfirmDelete(listTweet: any) {
    this.listTweet.splice(listTweet.id, 1)
    localStorage.removeItem("BD");
    this.deleteModalRef?.hide();
  }

  public onDeclineDelete() {
    this.deleteModalRef?.hide();
  }

}
