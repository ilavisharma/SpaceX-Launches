import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import LaunchItem from './LaunchItem';
import MissionKey from './MissionKey';

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
      links {
        mission_patch
      }
    }
  }
`;

class Launches extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1 className="display-4 my-3">Launches</h1>
        <MissionKey />
        <Query query={LAUNCHES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) {
              return (
                <div
                  style={{ display: 'block', margin: 'auto' }}
                  className="spinner-border"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              );
            }
            if (error) console.log(error);
            return (
              <React.Fragment>
                {data.launches.map(launch => (
                  <LaunchItem key={launch.flight_number} launch={launch} />
                ))}
              </React.Fragment>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}
export default Launches;
