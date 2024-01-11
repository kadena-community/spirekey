import { Text } from '@kadena/react-ui';
import './createwallet.css';

export const Loader = () => (
  <div className="loader">
    <div className="container">
      <div className="bg"></div>
      <div className="arm-left"></div>
      <div className="blacksmith">
        <div className="shape">
          <div className="dress"></div>
          <div className="dress"></div>
        </div>
        <div className="head">
          <div className="moustache"></div>
          <div className="moustache"></div>
          <div className="eye"></div>
        </div>
        <div className="arm-right">
          <div className="hammer"></div>
        </div>
      </div>
      <div className="sword"></div>
      <div className="anvil">
        <Text bold as="code">
          Kadena
        </Text>
      </div>
      <div className="fire-box">
        <div className="fire"></div>
        <div className="fire"></div>
        <div className="fire"></div>
        <div className="fire"></div>
      </div>
    </div>
  </div>
);
