export class Node {  //节点类
    value: string; //权值
    next: Node | null;
    //构造函数
    constructor(value:string) {
        this.value = value;
        this.next = null;
    }
}

export class Queue { //队列

    length: number; //长度
    head: Node | null; //头节点
    tail:Node | null;  //尾节点
    constructor() {
        this.head = null;
        this.length = 0;
        this.tail = null;
    }

    push(value:string) {
        let node = new Node(value);
        if (this.head === null) { // 如果头结点为空,当前节点作为头结点和尾节点
            this.head = node;
            this.tail= node;
        } else {
            (this.tail as Node).next = node;    //在链表尾部加入新节点
            this.tail= node;
        }
        this.length++; //更新链表长度
    }

    pop() {
        if (this.length >= 1) { //预防下标越界
            let current:Node = this.head as Node;//暂存当前位置
            this.head = current.next;
            this.length--; //更新链表长度
        }
    }

    front(){
        if(this.length>0){
            return (this.head as Node).value;
        }
        else{
            return null;
        }
    }

}