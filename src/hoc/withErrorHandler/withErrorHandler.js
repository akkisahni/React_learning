import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxillary';

const withErrorHandler = (WrappedComponent,axios) => {
    return class extends Component{
        state = {
            showError:null
        };
        componentDidMount(){
            this.reqInterceptor = axios.interceptors.request.use(request => {
                console.log(request);
                this.setState({showError:null});
                // Edit request config
                return request;
            }, error => {
                console.log(error);
                return Promise.reject(error);
            });
            
            this.resInterceptor = axios.interceptors.response.use(response => {
                console.log(response);
                // Edit request config
                return response;
            }, error => {
                console.log(error);
                this.setState({showError:error})
                return Promise.reject(error);
            });
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        errorHandled = () =>{
            this.setState({showError:null});
        }
        render(){
            return(
            <Aux>
                <Modal show={this.state.showError} modalClosed={this.errorHandled}>
                    {this.state.showError ? this.state.showError.message : null}
                </Modal>
                <WrappedComponent {...this.props} />
            </Aux>);
        }
    }
}

export default withErrorHandler;