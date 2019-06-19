import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import getUrl from './tools/getUrl';

const styles = theme => ({
    spinner: {
        position: 'relative',
        flexWrap: 'wrap',
        width: '100%',
        maxWidth: '250',
        top: '20%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3rem',
        fontSize: '36'
      }
  });

 /**
   * RandomItemSpinner Component
   */
  class RandomItemSpinner extends Component {

    constructor(props) {
      super(props);

      this.state = {
	      updated: true,
        end: true,
	      randomItem: null,
	      currency: this.props.currency - 30
      };
    }

    componentWillMount() {
        this.start(this.buildPool());
    }

    /**
     * Spinner loops through an array of items and uses a generator to yield each item at a specified delay
     * @param  { Array } items
     */
    start(items) {

        /**
         * Our generator
         */
        function* generator() {
            let index = 0;
            for (let item of items) {
                item.currentStep = index++;
                setTimeout(onChange.bind(this), this.delayAlgorithm(item.currentStep, this.props.options.iterations, this.props.options.delay));
                yield item;
            }
        }

        /**
         * Instantiate generator
         */
        var it = generator.call(this);

        /**
         * onChange iterator
         */
        var onChange = () => {
            let item = it.next();

            if (!item.value) {
                this.setState({ end: true, updated: false });
                return;
            }

            this.playClick();
            this.setState({ end: false, randomItem: item });
        };

        onChange();
    }

    /**
     * Build a randomize array of items to spin through
     * @return { Array }
     */
    buildPool() {
        let pool = this.iterationsSpinnerList(this.props.options.iterations / this.props.items.length, this.props.items);
            pool = this.randomizeSpinnerArray(pool);
            pool = this.dedupeSiblings(pool);

        return pool;
    }

    /**
     * Set delay for next iternation - run at normal speed until iterations hits 60% of total then slow down gradually
     * @return { Int }
     */
    delayAlgorithm(currentStep, iterations, delay) {
        if (currentStep > (iterations * .70)) {
            let stepsRemainingCounter = (currentStep - (iterations * .70));
            return delay + (stepsRemainingCounter * stepsRemainingCounter);
        }

        return delay;
    }

    /**
     * Randomize an Array
     * @param  { Array } items
     * @return { Array }
     */
    randomizeSpinnerArray(items) {
        return items.sort(this.randOrd);
    }

    /**
     * Randomize functionality for sorting
     */
    randOrd() {
        return Math.round(Math.random()) - 0.5;
    }

    /**
     * Clones an array by 'n' amount of times
     * @param  { Int } multiplier
     * @param  { Array } items
     * @return { Array }
     */
    iterationsSpinnerList(multiplier, items) {
        let myArray = [];

        // Multiply the items Array by 'n' amount times
        for (let x = 0; x <= multiplier; x++) {
            myArray.push(items);
        }

        // Flatten
        return myArray.reduce(function(a, b) {
            return a.concat(b);
        });
    }

    /**
     * Removes duplicate sibblings that are adjacent to one another in an Array
     * @param  { Array } items
     * @return { Array }
     */
    dedupeSiblings(items) {
        return items.filter((value, index, array) => {
            if (value !== array[index - 1]) {
                return value;
            }
        });
    }

    /**
     * Event Handler to respin
     */
    spinAgainHandler() {
        let url = getUrl('/api/rewards');
        fetch(url)
        .then(res => res.json())
        .then(
        (result) => {
          this.props.items = result.data});
	this.setState((prevState) => ({ currency: prevState.currency - 30 }));
        this.start(this.buildPool());
    }

    /**
     * Play Click Sound
     */
     playClick() {
         var isSafari = (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1);
         if (!isSafari) {
             let mp3url = 'http://raw.githubusercontent.com/andrewdelprete/randomItemSpinner/master/src/mp3s/click.mp3'
             let audio = new Audio(mp3url);
             audio.play();
         }
     }

     /**
      * Add rolled reward to database
      */
     addReward(reward_id) {
        let url = getUrl('/api/');
        let user;

        fetch(url + 'user')
            .then(res => res.json())
            .then(
                (result) => {
                    user = result.id
                    console.log(reward_id)
                    fetch(url + 'rewards', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            //reward_id: this.state.randomItem.value.id,
                            user_id: user,
                            reward_id: reward_id
                        })
                    });
                });
     }

    /**
     * Render bender
     * @return { JSX }
     */
    render() {
        if (this.state.end && this.state.updated === false) {
	    this.addReward(this.state.randomItem.value.id);
            let url = getUrl('/api/user');
            fetch(url)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
				updated: true
			});
                    });
        }
        //if (this.state.currency < 30) {
        //    this.setState({
	//      end: false,
	//      updated: true
	//   });
        //}
        return (
            <div style={{textAlign: 'center'}} className="RandomItemSpinner">
                <Typography gutterBottom variant="h5" component="h2">
		  Coins Available
		</Typography>
                <Typography gutterBottom variant="h5" component="h2">
		  {this.state.currency}
		</Typography>
                <SpinAgainButton disabled={ !this.state.end || this.state.currency < 30 } spinAgainHandler={ this.spinAgainHandler.bind(this) } />
                <RandomItem item={ this.state.randomItem.value } />
            </div>
        );
    }
} 
RandomItemSpinner.defaultProps = {
    options: {
        delay: 120,
        iterations: 60
    },
    items: []
};

RandomItemSpinner.displayName = 'RandomItemSpinner';
RandomItemSpinner.propTypes = {
    items: PropTypes.array.isRequired,
    options: PropTypes.object
};

/**
 * RandomItem Component
 */
class RandomItem extends Component {
    render() {
        return (
            <div className="RandomItem">
                <Typography
		  variant="h5"
		  component="h2"
		  style={{textAlign: 'center'}}>
		    {this.props.item.name} - {this.props.item.rarity}
		</Typography>
                <br />
                <img 
                style={{
                height: 'auto',
                maxHeight: '255px',
                width: 'auto'}} 
                src={ this.props.item.img } />
            </div>
        );
    }
}

RandomItem.defaultProps = {
    item: {
        name: null,
        img: null
    }
};

RandomItem.displayName = 'RandomItem';
RandomItem.propTypes = {
    item: PropTypes.object.isRequired
};

/**
 * SpinAgainButton Component
 */
class SpinAgainButton extends Component {
    render() {
        let disabled = this.props.disabled ? 'disabled' : '';

        return (
            <div className="SpinAgain">
                <Button 
                    className="SpinAgain__button"
                    disabled={ disabled }
                    style={{width:'250px'}}
                    onClick={ this.props.spinAgainHandler }>
                        30 Coins to Roll!
                </Button>
            </div>
        );
    }
}

SpinAgainButton.displayName = 'SpinAgainButton';
SpinAgainButton.propTypes = {
    disabled: PropTypes.bool.isRequired,
    spinAgainHandler: PropTypes.func
};

class Rewards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            rewards: false
        }
      }
    
    componentDidMount() {
        let url = getUrl('/api/user');
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                      isLoaded: result.currency
                    });
                });
    }

    getRewards() {
        let url = getUrl('/api/rewards');
        fetch(url)
            .then(res => res.json())
            .then(
            (result) => {
                console.log(result)
                this.setState({
                    rewards: result.data
                });
            }
        )
    }

    render() {
        const { classes } = this.props
        const { error, isLoaded, rewards } = this.state;

        return (
            <div className={classes.spinner}>
                {rewards === false ?
                    <React.Fragment>
			<Typography gutterBottom variant="h5" component="h2">
			Coins Available
			</Typography>
			<Typography gutterBottom variant="h5" component="h2">
			{ isLoaded }
			</Typography>
                        <Button  disabled={isLoaded < 30 ? true : false } onClick={() => this.getRewards()}>30 Coins to Roll!</Button>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <RandomItemSpinner items={rewards} currency={ isLoaded }/>
                    </React.Fragment>
                }
            </div>
        );
    }
}

export default withStyles(styles)(Rewards);
