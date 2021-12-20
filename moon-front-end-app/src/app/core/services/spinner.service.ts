import { Injectable } from '@angular/core';

@Injectable()
export class SpinnerService {

    public block: boolean;


    constructor() {
        this.block = false;
    }

    public blockOn(): void {
        this.block = true;
    }

    public blockOff(): void {
        this.block = false;
    }

    public isBlock(): boolean {
        return this.block;
    }


}
