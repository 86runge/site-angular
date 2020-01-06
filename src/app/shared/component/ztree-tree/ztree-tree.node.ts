export class ZtreeTreeNode {

    public id: string | number;
    public name: string;


    constructor(id: string | number, name: string, chlidren: Array<ZtreeTreeNode> = []) {
        this.id = id;
        this.name = name ? name : '--';
    }
}
