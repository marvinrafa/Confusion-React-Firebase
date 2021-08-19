import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardImgOverlay,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Col,
  Row
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

function RenderDish({ dish, favorite, postFavorite, auth }) {
  if (dish != null)
    return (
      <FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)' }}>
        <Card>
          <CardImg top src={baseUrl + dish.image} alt={dish.name} />
          {auth ? (
            <CardImgOverlay>
              <Button
                outline
                color="primary"
                onClick={() => (favorite ? console.log('Already favorite') : postFavorite(dish._id))}
              >
                {favorite ? <span className="fa fa-heart"></span> : <span className="fa fa-heart-o"></span>}
              </Button>
            </CardImgOverlay>
          ) : (
            <div></div>
          )}

          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    );
  else return <div></div>;
}

function RenderComments({ comments, postComment, dishId, auth }) {
  if (comments != null)
    return (
      <div>
        <h4> Comments: </h4>
        <ul className="list-unstyled ">
          <Stagger in>
            {comments.map((comment) => {
              return (
                <Fade in key={comment.id}>
                  <div>
                    <li>
                      <p>{comment.comment}</p>
                      <p>
                        --{comment.author.firstname},
                        {new Intl.DateTimeFormat('es-SV', {
                          year: 'numeric',
                          month: 'short',
                          day: '2-digit',
                          hour: 'numeric',
                          minute: 'numeric'
                        }).format(new Date(Date.parse(comment.updatedAt)))}
                      </p>
                    </li>
                  </div>
                </Fade>
              );
            })}
          </Stagger>
        </ul>
        <CommentForm dishId={dishId} postComment={postComment} auth={auth}></CommentForm>
      </div>
    );
  else return <div></div>;
}

const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading></Loading>
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.selectedDish != null)
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.selectedDish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.selectedDish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish
              dish={props.selectedDish}
              favorite={props.favorite}
              postFavorite={props.postFavorite}
              auth={props.auth}
            />
          </div>

          <div className="col-12 col-md-5 m-1">
            <RenderComments
              comments={props.comments}
              postComment={props.postComment}
              dishId={props.selectedDish._id}
              auth={props.auth}
            />
          </div>
        </div>
      </div>
    );
  else return <div></div>;
};

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  handleSubmit(values) {
    this.props.postComment(this.props.dishId, values.rating, values.comment);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render() {
    return (
      <div>
        {this.props.auth ? (
          <Button className="text-white bg-dark" outline onClick={this.toggleModal}>
            <span className="fa fa-edit fa-lg"></span> Submit Comment
          </Button>
        ) : (
          <p>--Login to submit a comment</p>
        )}

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Col className="form-group">
                <Row md={12}>
                  <Label htmlFor="rating">Rating</Label>
                </Row>
                <Row md={12}>
                  <Control.select model=".rating" name="rating" className="form-control ml-2">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Row>
              </Col>

              <Col className="form-group">
                <Row md={12}>
                  <Label htmlFor="comment">Comment</Label>
                </Row>
                <Row md={12}>
                  <Control.textarea model=".comment" id="comment" rows="6" name="comment" className="form-control" />
                  <Errors className="text-danger" model=".comment" show="touched" />
                </Row>
              </Col>
              <Row className="form-group">
                <Col>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default DishDetail;
