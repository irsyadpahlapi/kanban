<template>
  <div class="">
    <div class="headers">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Kanban</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto"></ul>
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">New Task</button>
        </div>
      </nav>
      <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">New Task</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title" v-model="title" placeholder="Enter title">
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <textarea class="form-control col-md-12" id="description" v-model="description" placeholder="Enter Description"></textarea>
              </div>
              <div class="form-group">
                <label for="Point">Point</label>
                <input type="text" class="form-control" id="Point" v-model="point" placeholder="Enter Point" value="0">
              </div>
              <div class="form-group">
                <label for="Assigned">Assigned To</label>
                <input type="text" class="form-control" id="Assigned" v-model="assigned" placeholder="Enter Assigned">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="addtask" data-dismiss="modal">Insert Task</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="modal fade" id="modaldetail" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title" id="exampleModalLongTitle"> {{detailtitle}} to {{detailassaigned}} </h3>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="Description">Task Description</label>
                <p id="Description">{{detaildescription}}</p>
              </div>
              <div class="form-group">
                <label for="Point">Point</label>
                <p id="Point">{{detailpoint}}</p>
              </div>
              <div class="form-group">
                <label for="Status">Status</label>
                <p id="Status">{{detailstatus}}</p>
              </div>
            </div>
            <div class="modal-footer">
              <div class="col-md-4" align="center">
                <button type="button" class="btn btn-warning" style="color:white" data-dismiss="modal" v-if="detailstatus !== 'back log'" @click="prevs(detailid,detailstatus)">Prev</button>

              </div>
              <div class="col-md-4" align="center">
                <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deletes(detailid)">Delete</button>
              </div>
              <div class="col-md-4" align="center">
                <button type="button" class="btn btn-success" data-dismiss="modal" @click="nexts(detailid,detailstatus)" v-if="detailstatus !== 'done'">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="card col-md-3">
          <div class="blok">
            <div class="card-header bg-danger text-white">Back-Log</div>
            <div class="card-body">
              <div class="card items" v-for="(n,i) in listtask" :key="i" v-if="n.status==='back log'">
                <h5 class="card-header">{{n.title}}</h5>
                <div class="card-body">
                  <label>{{n.point}}</label> <br>
                  <label class="card-text">{{n.assigned}}</label><br>
                  <Button href="#" class="btn btn-primary" data-toggle="modal" data-target="#modaldetail" @click="showdetail(i)">Show Detail</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card col-md-3">
          <div class="blok">
            <div class="card-header bg-warning text-white">To-Do</div>
            <div class="card-body">
              <div class="card items" v-for="(n,i) in listtask" :key="i" v-if="n.status==='to do'">
                <h5 class="card-header">{{n.title}}</h5>
                <div class="card-body">
                  <label>{{n.point}}</label> <br>
                  <label class="card-text">{{n.assigned}}</label><br>
                  <Button href="#" class="btn btn-primary" data-toggle="modal" data-target="#modaldetail" @click="showdetail(i)">Show Detail</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card col-md-3">
          <div class="blok">
            <div class="card-header bg-primary text-white">Doing</div>
            <div class="card-body">
              <div class="card items" v-for="(n,i) in listtask" :key="i" v-if="n.status==='doing'">
                <h5 class="card-header">{{n.title}}</h5>
                <div class="card-body">
                  <label>{{n.point}}</label> <br>
                  <label class="card-text">{{n.assigned}}</label><br>
                  <Button href="#" class="btn btn-primary" data-toggle="modal" data-target="#modaldetail" @click="showdetail(i)">Show Detail</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card col-md-3">
          <div class="blok">
            <div class="card-header bg-success text-white">Done</div>
            <div class="card-body">
              <div class="card items" v-for="(n,i) in listtask" :key="i" v-if="n.status==='done'">
                <h5 class="card-header">{{n.title}}</h5>
                <div class="card-body">
                  <label>{{n.point}}</label> <br>
                  <label class="card-text">{{n.assigned}}</label><br>
                  <Button href="#" class="btn btn-primary" data-toggle="modal" data-target="#modaldetail" @click="showdetail(i)">Show Detail</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {db} from '../firebase'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      title: '',
      description: '',
      point: 0,
      assigned: '',
      detailtitle: '',
      detaildescription: '',
      detailpoint: '',
      detailassaigned: '',
      detailstatus: '',
      detailid: '',
      listtask: []
    }
  },
  created: function () {
    this.showtask()
  },
  methods: {
    showtask () {
      let app = this
      var starCountRef = db.ref('/task')
      starCountRef.on('value', function (snapshot) {
        app.listtask = snapshot.val()
      })
    },
    addtask () {
      db.ref('/task').push(
        {
          title: this.title,
          description: this.description,
          point: this.point,
          assigned: this.assigned,
          status: 'back log'
        })
      this.title = ''
      this.description = ''
      this.point = ''
      this.assigned = ''
      this.showtask()
    },
    showdetail (id) {
      let app = this
      this.detailid = id
      var starCountRef = db.ref(`/task/${id}`)
      starCountRef.on('value', function (snapshot) {
        app.detailtitle = snapshot.val().title
        app.detaildescription = snapshot.val().description
        app.detailpoint = snapshot.val().point
        app.detailassaigned = snapshot.val().assigned
        app.detailstatus = snapshot.val().status
      })
    },
    nexts (id, status) {
      switch (status) {
        case 'back log':
          db.ref('task').child(id).update({status: 'to do'})
          break
        case 'to do':
          db.ref('task').child(id).update({status: 'doing'})
          break
        case 'doing':
          db.ref('task').child(id).update({status: 'done'})
          break
        default:
          console.log('Sorry loh')
      }
    },
    prevs (id, status) {
      switch (status) {
        case 'to do':
          db.ref('task').child(id).update({status: 'back log'})
          break
        case 'doing':
          db.ref('task').child(id).update({status: 'to do'})
          break
        case 'done':
          db.ref('task').child(id).update({status: 'doing'})
          break
        default:
          console.log('Sorry loh')
      }
    },
    deletes (id) {
      db.ref('task').child(id).remove(function (error) {
        console.log(error ? 'Uh oh!' : 'delete Success!')
      })
    }
  }
}
</script>

<style scoped>
  .card {
    padding:0px;
    border:none;
    font-weight: bold;
  }
  .items{
    border:1px solid rgba(0,0,0,0.125);
    margin-bottom:20px;
  }
  .blok{
    margin:0px 5px;
    border:1px solid rgba(0,0,0,0.125)
  }
  .blok:hover{
    box-shadow:5px 10px rgba(0,0,0,0.2);
  }
  .headers{
    margin-bottom:20px;
  }
  .container{
    padding-right:0px;
    padding-left:0px;
  }
  label,::-webkit-input-placeholder {
    font-size:12px;
    color:rgba(0,0,0,0.5)
  }
</style>
