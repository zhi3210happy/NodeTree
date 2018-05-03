<template>
  <div class="tree-node">
    <tree :data="data" :props="defaultProps" @node-click="handleClick">
    </tree>
    <div class="content">
      <header>
        <el-input type="text" v-model="filterText"/>
      </header>
      <section>     
       <div> 
         <el-tag v-for="(item,i) in users" :key="i"> {{item.name}}</el-tag>
       </div>
      </section>
    </div>
  </div>
</template>

<script>
import { tree ,input,tag} from "element-ui";
export default {
  name: "TreeNode",
  components: {
    tree,
    'el-input':input,
    'el-tag':tag
  },
  subscriptions() {
    return{
       inputObserve$:this.$watchAsObservable('filterText').debounceTime(200).pluck('newValue').map(v=>v)
    }
  },
  data() {
    return {
      data: rootGroup,
      defaultProps: {
        children: "group",
        label: "name"
      },
      filterText:'',
      users:[],
      usersSave:[]
    };
  },
  mounted(){
   this.$observables.inputObserve$.subscribe((v)=>this.filterUser(v))
  },
  methods:{
    filterUser(value){
      if(value===''){
        this.users=this.usersSave
        return
      }
      this.users=this.users.filter(({name})=>{
        return name.indexOf(value)>-1
      })
    },
    handleClick(data,node,com){
      let users=[]
      function filterUsers(data){
        if(Array.isArray(data)){
             data.forEach(({user,group})=>{
                users=users.concat(user)
                group&&group.length&&(filterUsers(group))
             })
        }else{
          data.user&&(users.concat(data.user))
          data.group&&data.group.length&&(filterUsers(data.group))
        }
      }
      filterUsers(data)
      this.users=users
      this.usersSave=users
    }
  }
};
const rootGroup = [
  {
    name: "总部门",
    user: [
      {
        name: "Prometheus",
        sex: "male"
      },
      {
        name: "Athena",
        sex: "female"
      }
    ],
    group: [
      {
        name: "子部门A",
        user: [
          {
            name: "Dijkstra",
            sex: "male"
          },
          {
            name: "Linus",
            sex: "male"
          }
        ],
        group: [
          {
            name: "孙子部门A",
            user: [
              {
                name: "Dijkstra",
                sex: "male"
              },
              {
                name: "Linus",
                sex: "male"
              }
            ],
            group: []
          }
        ]
      },
      {
        name: "子部门B",
        user: [],
        group: [      {
        name: "子部门A",
        user: [
          {
            name: "Dijkstra",
            sex: "male"
          },
          {
            name: "Linus",
            sex: "male"
          }
        ],
        group: [
          {
            name: "孙子部门A",
            user: [
              {
                name: "Dijkstra",
                sex: "male"
              },
              {
                name: "Linus",
                sex: "male"
              }
            ],
            group: []
          }
        ]
      },]
      },      {
        name: "子部门A",
        user: [
          {
            name: "Dijkstra",
            sex: "male"
          },
          {
            name: "Linus",
            sex: "male"
          }
        ],
        group: [
          {
            name: "孙子部门A",
            user: [
              {
                name: "Dijkstra",
                sex: "male"
              },
              {
                name: "Linus",
                sex: "male"
              }
            ],
            group: []
          }
        ]
      },      {
        name: "子部门A",
        user: [
          {
            name: "Dijkstra",
            sex: "male"
          },
          {
            name: "Linus",
            sex: "male"
          }
        ],
        group: [
          {
            name: "孙子部门A",
            user: [
              {
                name: "Dijkstra",
                sex: "male"
              },
              {
                name: "Linus",
                sex: "male"
              }
            ],
            group: []
          }
        ]
      },
    ]
  }
];
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
h1,
h2 {
  font-weight: normal;
}
.tree-node {
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content:center;
  .el-tree {
    border: #aaa 1px solid;
    height: 400px;
    width: 30%;
  }
  .content {
    width: 30%;
    height: 400px;
    border: #aaa 1px solid;
    header{
      margin:5px auto; 
      width: 80%;
    }
    section{
      // border: #aaa 1px solid;
      div{
      display:flex;
      justify-content: space-between;
      align-items: flex-start;
      margin: 10px auto;
      flex-wrap: wrap;
      list-style: none;
      width: 80%;
      height:330px;
      span{
        width: 70px;
        margin-bottom: 10px;
      }
      }
    }
  }
}
</style>
