import {Component, OnInit, TemplateRef} from '@angular/core';
import {LocalService} from '../../shared/service/local/local.service';
import {NzMessageService, NzModalService, NzNotificationService} from 'ng-zorro-antd';

@Component({
    selector: 'mysite-good-list',
    templateUrl: './good-list.component.html',
    styleUrls: ['./good-list.component.scss']
})
export class GoodListComponent implements OnInit {

    current = 0;

    index = 'First-content';

    i18n: any;
    visible = false;
    placement = 'left';

    constructor(private $localSrv: LocalService, private message: NzMessageService, private modalService: NzModalService, private notification: NzNotificationService) {
    }

    ngOnInit() {
        this.i18n = this.$localSrv.i18n;
    }

    pre(): void {
        this.current -= 1;
        this.changeContent();
    }

    next(): void {
        this.current += 1;
        this.changeContent();
    }

    done(): void {
        console.log('done');
    }

    changeContent(): void {
        switch (this.current) {
            case 0: {
                this.index = 'First-content';
                break;
            }
            case 1: {
                this.index = 'Second-content';
                break;
            }
            case 2: {
                this.index = 'third-content';
                break;
            }
            default: {
                this.index = 'error';
            }
        }
    }

    open(): void {
        this.visible = true;
    }

    close(): void {
        this.visible = false;
    }

    createMessage(type: string): void {
        this.message.create(type, `This is a message of ${type}`);
    }

    showConfirm(): void {
        this.modalService.confirm({
            nzTitle: '<i>Do you Want to delete these items?</i>',
            nzContent: '<b>Some descriptions</b>',
            nzOnOk: () => console.log('OK')
        });
    }

    showDeleteConfirm(): void {
        this.modalService.confirm({
            nzTitle: 'Are you sure delete this task?',
            nzContent: '<b style="color: red;">Some descriptions</b>',
            nzOkText: 'Yes',
            nzOkType: 'danger',
            nzOnOk: () => console.log('OK'),
            nzCancelText: 'No',
            nzOnCancel: () => console.log('Cancel')
        });
    }

    info(): void {
        this.modalService.info({
            nzTitle: 'This is a notification message',
            nzContent: '<p>some messages...some messages...</p><p>some messages...some messages...</p>',
            nzOnOk: () => console.log('Info OK')
        });
    }

    success(): void {
        this.modalService.success({
            nzTitle: 'This is a success message',
            nzContent: 'some messages...some messages...'
        });
    }

    error(): void {
        this.modalService.error({
            nzTitle: 'This is an error message',
            nzContent: 'some messages...some messages...'
        });
    }

    warning(): void {
        this.modalService.warning({
            nzTitle: 'This is an warning message',
            nzContent: 'some messages...some messages...'
        });
    }

    createBasicNotification(template: TemplateRef<{}>): void {
        this.notification.template(template);
    }

}
