import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import {v4 as uuid} from "uuid";

export default class ActivityStore{
    activityRegestry = new Map<string,Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode: boolean = false;
    loading: boolean = false;
    initialLoading: boolean = true;

    constructor(){
        makeAutoObservable(this)
    }

    get activitiesByDate(){
        return Array.from(this.activityRegestry.values()).sort((a,b) => 
        Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivities = async () => {
        try{
        const activities = await agent.Activities.list();
        activities.forEach(activity => {
            activity.date = activity.date.split('T')[0];
            this.activityRegestry.set(activity.id,activity);
        })
        this.setInitialLoading(false);
        }catch(error){
            console.log(error)
            this.setInitialLoading(false);
        }
    }
    setInitialLoading = (state: boolean) =>{
        this.initialLoading = state;
    }

    selectActivity = (id: string) =>  {
        this.selectedActivity = this.activityRegestry.get(id);
    }
    cancelSelectedActivity = () =>{
        this.selectedActivity = undefined;
    }
    openForm = (id? : string) => {
        id 
        ? this.selectActivity(id)
        : this.cancelSelectedActivity()
        this.editMode = true;
    }
    closeForm = () => {
        this.editMode = false;
    }
    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try{
            await agent.Activities.create(activity);
            runInAction(()=>{
                this.activityRegestry.set(activity.id,activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        }catch(error){
            console.log(error);
            runInAction(() =>{
                this.loading = false;
            })
        }
    }
    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try{
            await agent.Activities.update(activity);
            runInAction(()=>{
                this.activityRegestry.set(activity.id,activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        }catch(error){
            console.log(error);
            this.loading = false;
        }
    }
    deleteActivity = async (id: string) =>{
        this.loading = true;
        try{
            await agent.Activities.delete(id);
            runInAction(()=>{
                this.activityRegestry.delete(id);
                if(this.selectedActivity?.id === id) this.cancelSelectedActivity(); 
                this.loading = false;
            })
        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })
        }
    }
}