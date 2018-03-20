module ControllerAuthenticationHelpers
  def fake_sign_in(user)
    allow(subject).to receive(:current_user) { user }
  end
end

RSpec.shared_examples "requires authentication" do
  context 'when not signed in' do
    it 'redirects to sign in page' do
      status, headers, = subject.call(params)
      expect(status).to eq(302)
      expect(headers["Location"]).to include("/users/sign_in")
    end
  end
end
