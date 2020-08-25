import React, {Component} from 'react';

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        sidebarOpen:false,
        closeLinks:false,
        headerShow:false,
    }

    //   open navbar method
    handleSidebar = () => {
        this.setState({
            sidebarOpen: !this.state.sidebarOpen
        })
        console.log('Clicked');
    }

    // close links when pushing sidebar
    handleClose = () => {
        this.setState({
            sidebarOpen: false
        })
    }

    componentDidMount = () => {
        window.addEventListener('scroll', this.scrollEffect);
    }

    // scroll effect
    scrollEffect = () => {
        if(window.screenY>50){
            this.setState({
                headerShow: true
            })
        }
        else {
            this.setState({
                headerShow: false
            })
        }
    }

  render() {
    return (
      <ProductContext.Provider value={{
          ...this.state,
          handleSidebar: this.handleSidebar,
          handleClose: this.handleClose,
          scrollEffect: this.scrollEffect
      }}>
          {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer };
