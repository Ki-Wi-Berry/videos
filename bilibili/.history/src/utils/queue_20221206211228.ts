class NODE {  //节点类
    val: number|string; //权值
    next: NODE | null;
    //构造函数
    constructor(val:number|string) {
        this.val = val;
        this.next = null;
    }
}

class queue { //队列

    length: number; //长度
    head: NODE | null; //头指针
    tail:NODE | null;  //尾指针
    constructor() {
        this.head = null;
        this.length = 0;
        this.tail = null;
    }

    push(val:number|string) {
        let node = new NODE(val);
        if (this.head === null) { // 如果头结点为空,当前节点作为头结点
            this.head = node;
            this.tail= node;
        } else {
            (this.tail as NODE).next = node;    //在链表尾部加入新节点
            this.tail= node;
        }
        this.length++; //更新链表长度
    }

    pop() {
        if (this.length >= 1) { //预防下标越界
            let current:NODE = this.head as NODE;//暂存当前位置
            this.head = current.next;
            this.length--; //更新链表长度
            return current.val; //返回index处的值
        } else {
            return null;    //下标越界返回空
        }
    }

    

}