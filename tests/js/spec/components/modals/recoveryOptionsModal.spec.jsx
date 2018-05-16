import {Modal} from 'react-bootstrap';
import React from 'react';

import {mount} from 'enzyme';
import RecoveryOptionsModal from 'app/components/modals/recoveryOptionsModal';

describe('RecoveryOptionsModal', function() {
  let closeModal = jest.fn();
  let onClose = jest.fn();

  beforeEach(function() {
    MockApiClient.clearMockResponses();
    MockApiClient.addMockResponse({
      url: '/users/me/authenticators/',
      method: 'GET',
      body: Object.values(TestStubs.Authenticators()).map(x => x()),
    });
  });

  afterEach(function() {});

  it('get recovery codes if user skips backup phone setup', async function() {
    let wrapper = mount(
      <RecoveryOptionsModal
        Body={Modal.Body}
        Header={Modal.Header}
        authenticatorName="Authenticator App"
        closeModal={closeModal}
        onClose={onClose}
      />,
      TestStubs.routerContext()
    );
    expect(
      wrapper.find('RecoveryOptionsModal Button[name="addPhone"]').prop('to')
    ).toMatch('/settings/account/security/sms/enroll/');

    wrapper.find('RecoveryOptionsModal Button[name="skipStep"]').simulate('click');
    wrapper.find('RecoveryOptionsModal Button[name="getCodes"]').simulate('click');

    let mockId = 16;
    expect(
      wrapper.find('RecoveryOptionsModal Button[name="getCodes"]').prop('to')
    ).toMatch(`/settings/account/security/${mockId}/`);
  });
});
