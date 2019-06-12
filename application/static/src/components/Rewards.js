import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

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
                this.setState({ end: true });
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
        let ipAddress = window.location.hostname;
        let url;
        if (ipAddress === '127.0.0.1')
            url = 'http://' + ipAddress + ':8000/api/rewards';
        else
            url = 'http://' + ipAddress + '/api/rewards';
        fetch(url)
        .then(res => res.json())
        .then(
        (result) => {
          this.props.items = result.data});
    //     this.props.items = [{name: 'this', rarity: 'scary', img: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSEhMTFRIVFRcXFRcXFxgVFRUVFRUWFhUSFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGisfHx8rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tMi0tLSstLTcrK//AABEIAOAA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAgMEBQYBBwj/xAA3EAABAwMCAwYDBwUBAQEAAAABAAIRAwQhBTESQVEGImFxgZETobEHMkJSweHwFCNy0fFiohb/xAAaAQACAwEBAAAAAAAAAAAAAAAAAwECBAUG/8QAIxEAAgICAgICAwEAAAAAAAAAAAECEQMSITEEQRNRFCIyBf/aAAwDAQACEQMRAD8A9LaQn6TEgU0/SanFSRSYn1wLqABdQEIAELkrqCAQhCgAQuEroUgCEShQAIQhAAhJaUSgKFIXAV1AUCEIQAIQhAAhCEACQUtIKkAQuoQBAapNukNpJ2nTUgh0lCEKCTpXJXUlBAJQSV0IA6hCCVAHHLgcuEpji3HspAkEoLky2pII/m3+0zcVY4Xf+oPqgkl8S4KiiMrZmVx1TAM81FoiiU12UU3ZUW3rSfOU5SdkqLJolNOF0JsJcqQFIXGldQQCEIQAIQhAAkFLSCpQHUIQgkZpp8BM007xIIFShcQgAQULpQAldXF0IA6o9StDh0SdQvW02kkjwHVYDWu1/ehghw3zgKkpqPYyEHLo3tWuPTqqjUNUazJc2QcZErzit2gr1Jl54TyXbXvSXuMeJPySZZkPj47N0e0rADnkodLtGXQyCXSSAOgiCs3TLHnc8Dc9SZ69VZWlWm0gEd87AGcdCeSr8rZLwpGot3kkuJiZMJXxxMBwJ6DMSqFuq43gSQA0YEbkzupmn3oHeaI8T18kLIVeOi5a4M5yfolUbnfKrSXuMyD8o8z18F34J3mPCd/EqdyNDQ06kpziVNRLuREdFMoXOe8nRnYqUKLILqbpunKcCuLBCEIAEIQgASClptSgFIQhBNDbUsBcaEpBAIXUQgDqEIUACYvLtlJpc9waBzJTz3gAkmAN15R221p1WqWsMsBge3/VSctUMxwc3QrtX2i+O/gpjuDnsTtss38Lp6/up9rbYk77+KebbR5rJKbl2b4QUeiqFIpZccCcKc+io76QjKWMOU7mCGt2nKcNfhfvtn1nAUd/cENEk7lMsGDPP6oJr7Lvjw2Tu6B9TCsadYuHDMCfpGCqig7ipAn7zCHT4ZBKsKFQAxtEEewUoo0W1Os490YLIEch1j1U22eY8iq6kwyHzzgn1wfZXENY5p5OKsmKkuSwozG8eieayR1UcOyQP+hTaLeibARIaHEw746Kyt6gIwmvhyIKbZT4TKcrQqVE5CAUJgsEIQgATcpxNtGUEikLsIU2AlqUEBdAQQAQhCgAXHOAEnAQSsv2n1YgFgw0b9Seh8FWTrktFXwQe1Wtl3cpnuxE+M7+KydvQ5/XKlwTl3p4JTWbrHOWxuxx0QnhAXMIqMPiotWtG6WPXIst6lM1R0TLr1vio9W/CCaCoR1UWuVypXBzKYdVlBYmUbssgj/o6KdTuZ4YdEDY/SfBUnxRsVItn+yCKNdZag2OF5wYHvspdrqA4fhvDsHukZ6ZlZIVCVZWldTZRwNnbXgwDM9cbeI5K3tbgLE0r0DJKsLPUSYIOPHdXjOhMsLNvTdKU9shV1hWkBWTStUXaMco0wpdEtJISgVdC2CEIUgCRzS0h26AFSuIlCCDoC6hCCyBCFwlBDImo1+Fp6/TxXn+o3HxHnJgFavtPdBlJ0nLsBY6hT5/zyWbLLmjV48b5Ovp5XWtTpCZu3QPokM1JWyNevI2VJezP3t1KvbqMKnu7pVHRjQ3VpHfiM+ajPc4eKfbXkwu12yFJciCslfECaLYQArUVHCZT9KpCYawp6hTKh0TSJNKqVMFyQAoMQu0SZVCxbUqwGTuVZWV+eQwqVo+q0FlTAaFDdFZGj0fUpgE5Wqt6khYizaFpNKqQAOSfhn6MGeBdIQ1dK2GM6hcC6pIBJclJL0ACFxdQSZztT2vo2hFPiHxXeobPMx9Fk7vWq9WXCs6I/C4gewXn2rXD61d73mXF5n3U7TrlzNtuiwZckn0dvH4UYRvtlpd6hcAyK1QHrxH/audE+0GvThtdvxW7SMP/wBH3VRhw2TDbYApcckkTLBB9o1mt9oG3TmCm1zWiZLhkmPoik3Cq7FwPsraforbOXZmcFDhDb3Kq1OoMlWNUwqHVXfz0UlodlFf3mZKorm4e50tmOfRWN1SLzjDeZUZtMuPBRZJjOMCNySU/HFF8s0iFSunsdJy2Ve0q4cAQs5Xug0lpIPlyPNctrwtMg93om5MLauhOPNG+zSugrjGCVEoXbX7FONflZXBo07RJhapdnTkJAZhWmj2pLdsJbItECpSK7SEK2qW0HP/AFQK7hOFFMtfsdtBLh4bqyfWjEqsp1Qxsux/NlX1tZkkM73lMIpshmr0y77262GkXE+q8kstVe1w4mx03+q3XZ3U5cAiDpicsNlaPQqTk4o1q6VJC6MXwcx8MAurhCC4DcwrFTq44JLazTs4HyIS0BQ3CE5CEBR87a/ZfCuq1PpUdHlxGEqygmFqftT0osufij7tQT6gQR9Fj7R8Fc3KqbPS+PP5Mafs1dtSwkVacFFnVliqNSvXgpRDT2NFo4l56gZVpWOZWW7F3LnvqlxPLmtPWTUqMeWNSoh3VWFndZqkA43V/dBUmoUC7cpiRVIzUPqltFmC8gfv7LQdsqLLK3p2tLuvqjiqOEcRY0ic75yFDcxrOB7cPpunfdV3b/VRWrUqw2NINI6EEkj5rZ49XRi8zauDIX1UTDRgLloHQ5wIAaJMn5DxTdYAmZ3S6DeKG/hBytsqMMeuCc2RB2J26ELQW7SS2emVT21oXuDnwA3Zo6eJWktaZcZ58lgzNHVwba8lnTYOHxW37MWoNHIGyxlJpmFvOzzv7fosa7GZOjI9qnObVLNmgAkxsCsq/X+AHga3/N/LyC3vbmzJDjJHGwskcj+E/L5rx1gDXsbW2a8h4JyFpxYoybsTPM4xJV1rZeZqPdU8B3W/orTQdTc97WUqbQThsj7x6SeazOvd2vUDcNnuxtw8irLsvqzWNeH/AHm8NSkfyvY4TnxC1PBCjN+TkXJ6NZtbVf8A091SNOpsARw56gpzTbJ9rX+E/IzwneROM891vtR0une24dgVeEOpvgcTXRxATvCyIuhWp0+PFVjuHnMtJafmCsGXFq6Rrw5t0b/S3S0eSsVV6O7uDyVo1aMfRjyf0wqOgLNVrx/xHBxkE4gbLRXX3Ss6LYmXEbJeZtLgd4yT7JdrUa3OF207SW76ootqAvPLf5ryftT2grPqPpB0UxiAonZSoRc0iPzD6pEczVI67/y08Tm2e/QUJv4niurXZxPjKjtdpAubdzY77e8zz6ey8RvLQ03EHC+iCvLe32jBlUuA7rhI98/qlZ4WrNXgZ9Zaszmk3I2UTXaR35JFu/gcrS+LajANisKOtdkf7P8A71b/ABb9Ste4LL9jrNzKtSRALcejlqXiE/gx5uZkC4Cr6ytH5KgXFGZRdFEUdxQk4MFUl/ZFwhzA4eBV/WtsqHVsuv6pkJ10TLGmjJv0gD8J9XJ2jbxgBXz7JozCSaHomvO2hSwJeiNaUIwr60pwFDtRmFbU85SJy2Ha0LtG5W20RkNA8FktPbLlvtNt4hUgrYvL0RddsviUyvF+0mnd5zSIPI9YyJX0FXoAiCsT2l7Ptqz1GxG+3Nab0dozwqSpnid4JaGVgQ9mGu/MPyld0egwEl5EQfLb5rW3WkupnhqN7viJaT6ZCm6ZoNEkf2qPWSSQPGE/8lUUfiN9M9E7C6g5tmwOPFUfJY3ozAZxdMCVZHs/S7pjvyXOI6kz9VT6RSDIHE3yb+61Vq7ASd9nyQ8ei4JNtRA2UtoTVJOpqVCGM3tQNblVl/cNp0nPnkn9XBJYBtMn9FhftC1aGCi31KzZp1wb/CwbyR55qFf4lRzs5K032c2PxLthiQ3J9Fl6dOSvWfsy0osY6o4b4GPdIx/tNI9D/o5fh8dpezdcIXF2ELoUjyOzBZnt3a8VEO/KfkVplG1G1FSm5nUfMbIkrVFcctZJnhV3RIOyboB0iVpdR0lweQ4Genv+yr32/C4T1lcyScXyd3HNSVo0Gl0Rwg8439U7VKj6OwnidOIgJTjmEyPQhq5jdQ5wodZnupbxGyrrqqhlkiPWhRK9RvVJubnxUN9WVA1ROV3woFxXhSKowq6pBqt4vuyJV4ohqiwsKdR2WgxzKuLerwiHEfVRNXuiKRbSdw+ULI/1Fw0/ecROxyiEN+boq3R6NpN01tRucSvTtOrMIA4hPReIadWkB0Afoo152qr8f9pxaG7E7mOnRGNPakVy4t0vR7zrF38JvER3RvHJZO57QU3bHf8Amypuxvbus94pXLeMHE/7lQ/tCsW29dj6RinWBPD+VzSJA8Mq025CY4NHTNLRu2PEOAPnlS6Wi0HGQ1oJ6LBaffnC2mjagDHXCWpc0xk8bS4LWlozWmWq4tKMJNnUDhyU+m0LRCNmCcn7F0xCeSGhKTzOyNcsl0+Cw2vaEariecra3lxwnYwQkUWBxmFnyQUnRswZ5Yv2RgNM7FPLxIxIz6r0mwtRSptYNgnmMA2CUmY8MYdFPJ8zJn/p8AhCE4y2CEIQQQdT0tlYZEO5FZj/APGPc+XPaBPKSf8AS2qFSUIy7GRyyjwmZe90Snb0SWlxdIEk9TyGwWZqGCVvO0LJoO8IPzC89unQs2dKNUbPGk3djVxWgeaz9/ck4HqrC9rYVG/YlZ07Z0YxIl1esp4cRKbp6ox2BHrKqKtHjeSU7/RBafjhXItzk+i5+MDyUG5aCSQo1GsQQ1/kD+hUz+mKrpryG1kdsnEqcyzESQnLOzzJ+qnkQqyn9ByQG4PCFIvOzzvvtGP5solu+ap6BbvS6ocwNPTwVeU+CdmkYqxqik4OIMj9Ea/rNS5cziwxghg6TufkrHtBp5a8kDG6oWsgqYpInfbsmUCQrqw1DhMlUVMuiQE0/UGtMFw9M/NVcW3wWtez1DRdcEgTlbOxuA4SvCtPvph7DML0bsnqxdhxPJWhNxdMy58CatG9alJmhUkJ2VuTs5ckR3sDiQcpynQATwCEarshydUCEIVioIQhAAhCEACEIQA3cUg5rmnYgj3Xl+qUy1xadwY9RuvVFje2+mx/dAwd/A/m9UjPDaJp8bJrPk86v3clB5Qp18MqFzWA7Uein+FDipDWLl2yHSnqDpTduCjIle2Dkm3uzS7rgXN5EbqeaaR8Ecwr7+mUa+hbNUp9T7QfJcOoB2E3VsGO23UN+lnkT6IqBeL+yZQIbJnJV/pl43HeGfSFkTYVORKXSsqvU+6HFP2Sqfo39W4a4QSCqa9o0qY43FoHmM+QVJS0usfxuHk4qTQ0D8TiXEdTPzKpqvsprXREua7q2Gd2n/8AR8+gTVTTWgAY9vdXrqDG7KPWbzVlOugcbKnTKXC4jktp2ZrcLx4lZizp94labQKB4wekJWSVyGRX60eqadVlo8lYU8qm0vZXdMYW7C7RxMyqQpCEJwgEIQgAQhCABCEIAEIQgATdxQa9pY4S1wghOIQB5N2s0F9B+00zPC7l/i48nLKPYV9AXFBr2lj2hzSIIIkELAdpOwbGg1KFTh/8Pz6NdP1nzWTLh9o6XjeWq1kecV6chN0WwVPuLR7MOEH5HyUcDKy9G+0/YFiYgqxa2Vx9GQpUqArw+F34jjsnXshDR8lNlREP5AJy3uTzEeYTzT4KztbZjh4lQ6C/oj0rk8o9kmpd8gp9bTIXKGl8yMKCNiuo0yTJlIvBAjqrytQDRgKrqUC4qrkWiM2NqTC2GiWoEdVB0rTSYwttpGjnBIgfM+Svjxyk7F580YqrLDSqHNWiSxgAgbJS6UI6qjizls7BCEKxUEIQgAQhCABCEIAEIQgAQhUur6+ymIZDn+fdHtuobS7JSsmapqTaQ5F/IfqfBYu+1B9Ulzj6TgDaAE1Xvi9xLjk8ymKh8Qs053wjZixKPLIl4zi6Y22wVVmgw91w4T1GAVZ1nFV104HDgCFnas1psh3FuWHBkJptwDiQuVarmznibyB3ChuqglVcRsWO12wcrtEJFOryIn6/upFKkHbEqoy0IJzAVjpLjMJdHSgfxZ8oWi0vQ4goSbKynFIXTti6PJWTLIEQBPv+itNP0xo39pwralQaNgE+GJswZM9dGbHZkvyTH88VNodkaI+8XHyx9FfhLC0RwxRnlnm/ZEtNOpU44W7czk/NTEkhJITUqEttjiEgOKUHKxFHUIQggEIQgAQhCkD/2Q=='},
    // {name: 'chris', rarity: 'fat', img: 'https://i.ytimg.com/vi/3EIbWjkimAs/maxresdefault.jpg'}]
        this.start(this.buildPool());
    }

    /**
     * Play Click Sound
     */
     playClick() {
         var isSafari = (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1);
         if (!isSafari) {
             let mp3url = 'https://raw.githubusercontent.com/andrewdelprete/randomItemSpinner/master/src/mp3s/click.mp3'
             let audio = new Audio(mp3url);
             audio.play();
         }
     }

     /**
      * Add rolled reward to database
      */
     addReward(reward_id) {
        let ipAddress = window.location.hostname;
        let url;
        let user;

        if (ipAddress === '127.0.0.1')
            url = 'http://' + ipAddress + ':8000/api/';
        else
            url = 'http://' + ipAddress + '/api/';
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
        let currency;
        if (this.state.end) {
            this.addReward(this.state.randomItem.value.id)
            let ipAddress = window.location.hostname;
            let url;
            if (ipAddress.trim() === '127.0.0.1'.trim())
                url = 'http://' + ipAddress + ':8000/api/user';
            else
                url = 'http://' + ipAddress + '/api/user';
            fetch(url)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.props.currency = result.currency
                    });
        }
        currency = this.props.currency
        console.log(currency)
        if (currency < 5) {
            this.state.end = false
        }
        console.log('this is the currency')
        console.log(currency)
        return (
            <div style={{textAlign: 'center'}} className="RandomItemSpinner">
                <h2>Coins Available</h2>
                <h3>{currency}</h3>
                <SpinAgainButton disabled={ !this.state.end } spinAgainHandler={ this.spinAgainHandler.bind(this) } />
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
                <h3 style={{textAlign: 'center'}}>{this.props.item.name} - {this.props.item.rarity}</h3>
                <br />
                <img 
                style={{
                height: 'auto',
                maxHeight: '250px',
                width: 'auto',
                maxWidth: '250px'}} 
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
                        &#9658; 5 Coins to Roll!
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
        let ipAddress = window.location.hostname;
        let url;
        if (ipAddress.trim() === '127.0.0.1'.trim())
            url = 'http://' + ipAddress + ':8000/api/user';
        else
            url = 'http://' + ipAddress + '/api/user';
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.state.isLoaded = result.currency
                });
      }

    getRewards() {
        let ipAddress = window.location.hostname;
        let url;
        if (ipAddress === '127.0.0.1')
            url = 'http://' + ipAddress + ':8000/api/rewards';
        else
            url = 'http://' + ipAddress + '/api/rewards';
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
                <br />
                {rewards === false ?
                    <React.Fragment>
                        <h2>Coins Available</h2>
                        <h3>{this.state.isLoaded}</h3>
                        <Button disabled={this.state.isLoaded < 5 ? true : false }onClick={() => this.getRewards()}>5 Coins to Roll!</Button>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <RandomItemSpinner items={rewards} currency={this.state.isLoaded} />
                    </React.Fragment>
                }
            </div>
        );
    }
}

export default withStyles(styles)(Rewards);