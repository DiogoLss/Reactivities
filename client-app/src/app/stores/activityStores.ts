import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
//import {v4 as uuid} from "uuid";

export default class ActivityStore{
    activityRegestry = new Map<string,Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode: boolean = false;
    loading: boolean = false;
    initialLoading: boolean = false;

    constructor(){
        makeAutoObservable(this)
    }

    get activitiesByDate(){
        return Array.from(this.activityRegestry.values()).sort((a,b) => 
        Date.parse(a.date) - Date.parse(b.date));
    }

    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = activity.date;
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as {[key: string]: Activity[]})
        )
    }

    loadActivities = async () => {
        this.setInitialLoading(true);
        try{
        const activities = await agent.Activities.list();
        activities.forEach(activity => {
            this.setActivity(activity);
        })
        this.setInitialLoading(false);
        }catch(error){
            console.log(error)
            this.setInitialLoading(false);
        }
    }
    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if(activity) {
            this.selectedActivity = activity;
            return this.selectedActivity
        }
        else{
            this.setInitialLoading(true);
            try{
                activity = await agent.Activities.details(id)
                this.setActivity(activity);
                runInAction(()=>{
                    this.selectedActivity = activity
                });
                this.setInitialLoading(false);
                return activity;
            }catch(error){
                console.log(error);
                this.setInitialLoading(false);
            }
        }
    }

    private getActivity = (id: string) => {
        return this.activityRegestry.get(id);
    }
    private setActivity = (activity: Activity) =>{
        activity.date = activity.date.split('T')[0];
        this.activityRegestry.set(activity.id,activity);
    }
    
    setInitialLoading = (state: boolean) =>{
        this.initialLoading = state;
    }

    createActivity = async (activity: Activity) => {
        this.loading = true;
        //activity.id = uuid();
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