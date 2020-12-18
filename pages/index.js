import React from "react";
import ReactDOM from "react-dom";
import ReactFullpage from "@fullpage/react-fullpage";
import Head from 'next/head'

// import 'fullpage.js/vendors/scrolloverflow'; // Optional. When using scrollOverflow:true

const originalColors = ['#ff5f45', '#0798ec', '#fc6c7c', '#435b71', 'orange', 'blue', 'purple', 'yellow'];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionsColor: [...originalColors],
      fullpages: [
        {
          text: "Section 1"
        },
        {
          text: "Section 2"
        },
        {
          text: 'Section 3',
        }
      ]
    };
  }

  onLeave(origin, destination, direction) {
    console.log("onLeave", { origin, destination, direction });
    // arguments are mapped in order of fullpage.js callback arguments do something
    // with the event
  }

  handleChangeColors() {
    const newColors =
      this.state.sectionsColor[0] === "yellow"
        ? [...originalColors]
        : ["yellow", "blue", "white"];
    this.setState({
      sectionsColor: newColors
    });
  }

  handleAddSection() {
    this.setState(state => {
      const { fullpages } = state;
      const { length } = fullpages;
      fullpages.push({
        text: `section ${length + 1}`,
        id: Math.random()
      });

      return {
        fullpages: [...fullpages]
      };
    });
  }

  handleRemoveSection() {
    this.setState(state => {
      const { fullpages } = state;
      const newPages = [...fullpages];
      newPages.pop();

      return { fullpages: newPages };
    });
  }

  moveSectionDown(){
    fullpage_api.moveSectionDown();
  }

  render() {
    const { fullpages } = this.state;

    if (!fullpages.length) {
      return null;
    }

    const Menu = () => (
      <div
        className="menu"
        style={{
          position: "fixed",
          top: 0,
          zIndex: 100
        }}
      >
        <ul className="actions">
          <li>
            <button onClick={() => this.handleAddSection()}>Add Section</button>
            <button onClick={() => this.handleRemoveSection()}>
              Remove Section
            </button>
            <button onClick={() => this.handleChangeColors()}>
              Change background colors
            </button>
            <button onClick={() => this.moveSectionDown()}>
              Move Section Down
            </button>
          </li>
        </ul>
      </div>
    );

    return (

      <div className="App">
        <Head>
          <title>My styled page</title>
          <link href="/static/styles.css" rel="stylesheet" />
        </Head>
        <Menu />
        <ReactFullpage
          navigation
          onLeave={this.onLeave.bind(this)}
          // sectionsColor={this.state.sectionsColor}
          render={comp =>
            console.log("render prop change") || (
              <ReactFullpage.Wrapper>
                <div>
                  <section key={'page-1'} className="section">
                    <div className="SectionContainer columns">
                      <div className="Content Content--Left column">
                        <div className="MainText">
                          <h2>
                            <span className="Subtitle is-4">Did you know that </span>
                            <span className="Title is-1">8 men are wealthier than half of the popullation</span>
                            <span className="Subtitle is-1">?</span>
                          </h2>
                        </div>
                      </div>
                      <div className="Content Content--Right column">
                        <div className="Illustration">
                          <img src={'https://thumbs.dreamstime.com/x/cartoon-earth-humans-divided-two-unequal-parts-vector-65383884.jpg'} />
                        </div>
                      </div>
                    </div>
                  </section>
                  <div key={'page-2'} className="section">
                    <h1>22222</h1>
                  </div>
                  <div key={'page-3'} className="section">
                    <h1>33333</h1>
                  </div>
                </div>
              </ReactFullpage.Wrapper>
            )
          }
        />
      </div>
    );
  }
}
                {/* {fullpages.map(({ text }) => (
                  <div key={text} className="section">
                    <h1>{text}</h1>
                  </div>
                ))} */}
export default App;