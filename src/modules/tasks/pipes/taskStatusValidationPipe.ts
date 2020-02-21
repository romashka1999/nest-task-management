import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";

import { TaskStatus } from "../taskStatus.enum";

export class TaskStatusValidationpipe implements PipeTransform {
    readonly allowedTaskStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ];

    transform(value: any, metadata: ArgumentMetadata) {
        console.log('value:' , value);
        console.log('metadata: ', metadata);

        value = value.toUpperCase(); 

        if(!this.isStatusValid(value)) {
            throw new BadRequestException('invalid status');
        }

        return value;
    }

    private isStatusValid(status: any) {
        const idx = this.allowedTaskStatuses.indexOf(status); //if not exist returns -1
        return idx !== -1;
    }
}