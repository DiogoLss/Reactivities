import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import ActivityDetail from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props{
    activities: Activity[];
    submitting: boolean;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
}

export default observer(function ActivityDashboard({activities, submitting,
         createOrEdit, deleteActivity}: Props){
    const {activityStore} = useStore();
    const {selectedActivity,editMode} = activityStore;

    return(
        <Grid>
            <Grid.Column width='10'>
                <ActivityList 
                    activities={activities} 
                    deleteActivity={deleteActivity}
                    submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetail 
                    activity={selectedActivity} 
                />}
                {editMode &&
                    <ActivityForm
                        submitting={submitting}
                        activity={selectedActivity} 
                        createOrEdit={createOrEdit} 
                    />
                }
            </Grid.Column>
        </Grid>
    )
})