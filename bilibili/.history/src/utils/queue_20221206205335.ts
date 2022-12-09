class NODE {  //节点类
    val:number; //权值
    next:NODE|null; 
    //构造函数
    constructor(val) { 
        this.val = val;
        this.next = null;
    }
}

class queue{ //队列

    length:number; //长度
    head:NODE|null; //头指针
    constructor() { 
        this.head = null;
        this.length = 0;
    }

    append(val) { 
        let node = new NODE(val);
        let current:NODE|null; //暂存当前位置
        if(this.head === null) { // 如果头结点为空,当前节点作为头结点
            this.head = node;
        } else { 
            current = this.head;
            while(current.next) {     //遍历找到链表尾部
                current = current.next;
            }
            current.next = node;    //在链表尾部加入新节点
        }
        this.length++; //更新链表长度
    }

}