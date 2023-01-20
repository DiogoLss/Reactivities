import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, ButtonGroup, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';

export default observer( function ActivityDetail(){
    const {activityStore} = useStore();
    const {selectedActivity: activity, loadActivity, initialLoading} = activityStore;
    const {id} = useParams<{id: string}>();

    useEffect(()=>{
        if(id) loadActivity(id);
    },[id, loadActivity])

    if(initialLoading || !activity) return <LoadingComponent/>

    return(
    <Card fluid>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
        <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
            <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>
            {activity.description}
        </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <ButtonGroup>
            <Button as={Link} to={`/manageActivity/${activity.id}`} basic color='blue' content='Edit' />
            <Button as={Link} to='/activities' basic color='grey' content='Cancel' />
        </ButtonGroup>
        </Card.Content>
    </Card>
    )
})