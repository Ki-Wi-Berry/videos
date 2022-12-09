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

    push(val) { 
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


     pop(index) { 
        if(index > -1 && index < this.length) { //预防下标越界
            var current = this.head;//暂存当前位置
            var previous; //暂存当前位置的前一个
            var position = 0;
            if(index === 0) {  //要删除的是第一个位置，就得改变头指针指向
                this.head = (current as NODE).next;
            } else { 
                while(position++ < index) { //遍历直到current处于index位置
                    previous = current;
                    current = current.next;  //此时current处于index处,previous在index-1处
                }
                previous.next = current.next; //改变链表结构,跳过index处
            }
            this.length--; //更新链表长度
            return current.val; //返回index处的值
        } else { 
            return null;    //下标越界返回空
        }
    }

}