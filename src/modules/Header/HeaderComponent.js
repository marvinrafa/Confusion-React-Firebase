import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Jumbotron,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import './header.css';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavOpen: false,
      isLoginModalOpen: false,
      isRegisterModalOpen: false
    };

    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    // this.toggleRegisterModal = this.toggleRegisterModal.bind(this);

    this.toggleNav = this.toggleNav.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  toggleLoginModal() {
    this.setState({
      isLoginModalOpen: !this.state.isLoginModalOpen
    });
  }

  toggleRegisterModal() {
    this.setState({
      isRegisterModalOpen: !this.state.isRegisterModalOpen
    });
  }

  handleLogin(event) {
    this.toggleLoginModal();
    this.props.loginUser({ username: this.username.value, password: this.password.value });
    event.preventDefault();
  }

  // handleRegister(event) {
  //   event.preventDefault();
  //   this.toggleRegisterModal();
  //   this.props.registerUser({ username: this.username.value, password: this.password.value });
  // }

  handleGoogleLogin(event) {
    this.toggleLoginModal();
    this.props.googleLogin();
    event.preventDefault();
  }

  handleLogout() {
    this.props.logoutUser();
  }

  render() {
    return (
      <div>
        <Navbar dark expand="md">
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className="logo" href="/">
              <img src="assets/images/logo.png" height="30" width="41" alt="Ristorante Con Fusion" />
            </NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link" to="/home" onClick={this.toggleNav}>
                    <span className="fa fa-home fa-lg nav-icon"></span> Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/aboutus" onClick={this.toggleNav}>
                    <span className="fa fa-info fa-lg nav-icon"></span> About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/menu" onClick={this.toggleNav}>
                    <span className="fa fa-list fa-lg nav-icon"></span> Menu
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/favorites" onClick={this.toggleNav}>
                    <span className="fa fa-heart fa-lg nav-icon"></span> My Favorites
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/contactus" onClick={this.toggleNav}>
                    <span className="fa fa-address-card fa-lg nav-icon"></span> Contact Us
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  {!this.props.auth.isAuthenticated ? (
                    <Button outline onClick={this.toggleLoginModal} className="btn-login">
                      <span className="fa fa-sign-in fa-lg"></span> Login
                      {this.props.auth.isFetching ? <span className="fa fa-spinner fa-pulse fa-fw"></span> : null}
                    </Button>
                  ) : (
                    <div>
                      <div className="navbar-text mr-3">{this.props.auth.user.displayName}</div>
                      <Button outline onClick={this.handleLogout}>
                        <span className="fa fa-sign-out fa-lg"></span> Logout
                        {this.props.auth.isFetching ? <span className="fa fa-spinner fa-pulse fa-fw"></span> : null}
                      </Button>
                    </div>
                  )}
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        <Jumbotron>
          <div className="container">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>Ristorante con Fusion</h1>
                <p>
                  We take inspiration from the World's best cuisines, and create a unique fusion experience. Our
                  lipsmacking creations will tickle your culinary senses!
                </p>
              </div>
              <div className="col-12 col-sm-6 header-logo">
                <img src="assets/images/logo.png" alt="Ristorante Con Fusion" />
              </div>
            </div>
          </div>
        </Jumbotron>

        {/* Login modal */}

        <Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal}>
          <ModalHeader toggle={this.toggleLoginModal} className="modal-header">
            Login
          </ModalHeader>
          <ModalBody className="modal-body">
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Username (email)</Label>
                <Input type="text" id="username" name="username" innerRef={(input) => (this.username = input)} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password" innerRef={(input) => (this.password = input)} />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" name="remember" innerRef={(input) => (this.remember = input)} />
                  Remember me
                </Label>
              </FormGroup>
              <Button type="submit" value="submit" className="btn-request-login">
                Login
              </Button>
            </Form>
            <Button color="danger" onClick={this.handleGoogleLogin}>
              <span className="fa fa-google fa-lg"></span> Login with Google
            </Button>
            {/* <p className=" mt-2">
              Not registered yet?
              <Button
                color="black"
                onClick={() => {
                  this.toggleRegisterModal();
                  this.toggleLoginModal();
                }}
              >
                Click Here!
              </Button>
            </p> */}
          </ModalBody>
        </Modal>

        {/* Register Modal */}

        {/* <Modal isOpen={this.state.isRegisterModalOpen} toggle={this.toggleRegisterModal}>
          <ModalHeader toggle={this.toggleRegisterModal}>Register</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleRegister} id="register-form">
              <FormGroup>
                <Label htmlFor="register_username">Your e-mail</Label>
                <Input
                  type="email"
                  id="register_username"
                  name="register_username"
                  innerRef={(input) => (this.username = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="register_password">Password</Label>
                <Input
                  type="password"
                  id="register_password"
                  name="register_password"
                  innerRef={(input) => (this.password = input)}
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" name="register_remenber" innerRef={(input) => (this.remember = input)} />
                  Remember me
                </Label>
              </FormGroup>
              <Button type="submit" value="submit" className="btn-request-login">
                Register account
              </Button>
            </Form>
            <Button color="danger" onClick={this.handleGoogleLogin}>
              <span className="fa fa-google fa-lg"></span> SignUp with Google
            </Button>
          </ModalBody>
        </Modal> */}
      </div>
    );
  }
}
export default Header;
