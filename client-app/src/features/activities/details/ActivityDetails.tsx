import React from 'react';
import { Button, ButtonGroup, Card, Image } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';

interface Props{
    activity: Activity;
}

export default function ActivityDetail({activity}: Props){
    const {activityStore} = useStore();
    const {openForm, cancelSelectedActivity} = activityStore;

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
            <Button onClick={() => openForm(activity.id)} basic color='blue' content='Edit' />
            <Button onClick={cancelSelectedActivity} basic color='grey' content='Cancel' />
        </ButtonGroup>
        </Card.Content>
    </Card>
    )
}