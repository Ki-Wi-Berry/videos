class node {  //节点类
    val:Number; //权值
    next:node|null; 
    //构造函数
    constructor(val) { 
        this.val = val;
        this.next = null;
    }
}

class queue{ //队列

    length:Number; //长度
    head:node|null; //头指针
    constructor() { 
        this.head = null;
        this.length = 0;
    }
}