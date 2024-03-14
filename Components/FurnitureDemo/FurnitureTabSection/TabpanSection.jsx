import React, { Fragment } from 'react';
import { Row, TabContent, TabPane } from 'reactstrap';
import LeftTab from './LeftTab';
import MiddleTab from './MiddleTab';
import RightTab from './RightTab';
const TabpanSection = ({ activeTab, num, val, TabMiddleColor, LeftRightTab , newtabs}) => {
  return (
    <TabContent activeTab={activeTab}>
            {newtabs
              ?.filter((el) => el.nav_name === val)
              .map((item, id) => {
                // console.log(item);
                return (
                  <Fragment key={id}>
                    {item.nav_name === val && (
                      <TabPane tabId={num} className={`${activeTab && activeTab === id ? 'active show' : ''}`} key={id}>
                        <div className='offer-wrap product-style-1'>
                          <Row className='g-xl-4 g-3'>
                            
                                <Fragment key={id}>
                                  <LeftTab elem={item.products.data} LeftRightTab={LeftRightTab} />
                                  <MiddleTab elem={item.products.data} TabMiddleColor={TabMiddleColor} LeftRightTab={LeftRightTab} />
                                  <RightTab elem={item.products.data} LeftRightTab={LeftRightTab} />
                                </Fragment>
                          </Row>
                        </div>
                      </TabPane>
                    )}
                  </Fragment>
                );
              })}
    </TabContent>
  );
};

export default TabpanSection;
