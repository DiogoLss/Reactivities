import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Redirect, useParams, useHistory } from 'react-router';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import { Link } from 'react-router-dom';


export default observer( function ActivityForm(){
    const {activityStore} = useStore();
    const {selectedActivity,createActivity,updateActivity,loading,loadActivity, initialLoading} = activityStore;
    const {id} = useParams<{id: string}>();
    const history = useHistory();

    const[activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(()=>{
        if(id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity])

    //const [activity, setActivity] = useState(initialState);

    function handleSubmit(){
        if(!activity.id){
            let id = uuid();
            activity.id = id;
            createActivity(activity).then(() => history.push(`/activity/${id}`))
        }else{
            updateActivity(activity).then(() => history.push(`/activity/${activity.id}`))
        }
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name,value} = event.target;
        setActivity({...activity, [name]: value})
    }

    if(initialLoading) return <LoadingComponent content='loading activity...'/>
    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to={'/activities'} floated='right' typpe='button' content='Cancel' />
            </Form>
        </Segment>
    )
})