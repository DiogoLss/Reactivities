import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, GridColumn } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSideBar from './ActivityDetailedSideBar';

export default observer( function ActivityDetail(){
    const {activityStore} = useStore();
    const {selectedActivity: activity, loadActivity, initialLoading} = activityStore;
    const {id} = useParams<{id: string}>();

    useEffect(()=>{
        if(id) loadActivity(id);
    },[id, loadActivity])

    if(initialLoading || !activity) return <LoadingComponent/>

    return(
        <Grid>
            <GridColumn width={10}>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailedInfo activity={activity} />
                <ActivityDetailedChat/>
            </GridColumn>
            <GridColumn width={6}>
                <ActivityDetailedSideBar/>
            </GridColumn>
        </Grid>
    )
})