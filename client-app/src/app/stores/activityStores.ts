import { makeAutoObservable, observable } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore{
    activities: Activity[] = [];
    selectedActivity: Activity | undefined = undefined;
    editMode: boolean = false;
    loading: boolean = false;
    initialLoading: boolean = false;

    constructor(){
        makeAutoObservable(this)
    }
    loadActivities = async () => {
        this.setInitialLoading(true);
        try{
        const activities = await agent.Activities.list();
        activities.forEach(activity => {
            activity.date = activity.date.split('T')[0];
            this.activities.push(activity);
        })
        this.setInitialLoading(false);
        }catch(error){
            console.log(error)
            this.setInitialLoading(false);
        }
    }
    setInitialLoading = (state: boolean) =>{
        this.initialLoading = state;
    }//

    selectActivity = (id: string) =>  {
        this.selectedActivity = this.activities.find(x => x.id === id);
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
}