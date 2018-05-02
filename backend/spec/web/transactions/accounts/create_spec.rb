require 'spec_helper'

describe Web::Transactions::Accounts::Create do
  let(:account_repo) { double }
  let(:user_repo) { double }
  subject do
    described_class.new(
      account_repo: account_repo,
      user_repo: user_repo,
    )
  end

  it 'steps are in the right order' do
    pending 'check steps here'
  end

  context 'with valid attributes' do
    let(:attributes) do
      {
        name: 'Test',
        subdomain: 'test',
        owner: {
          email: 'test@example.com',
          password: 'password'
        }
      }
    end

    it 'creates an account' do
      expect(account_repo).to receive(:create).with("")
      expect(user_repo).to receive(:create).with("")
      subject.(attributes)
    end
  end
end
