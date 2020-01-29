require 'spec_helper'

describe Twist::Transactions::Books::Create do
  context 'when given valid parameters' do
    let(:book_repo) { double(Twist::BookRepository) }
    subject { described_class.new(book_repo: book_repo) }

    it 'creates a book' do
      expect(book_repo).to receive(:create_with_branches).with(
        title: "Exploding Rails",
        permalink: "exploding-rails",
        format: "markdown",
        branches: [
          {
            name: "master",
            default: true,
          },
        ],
      )

      subject.(
        title: "Exploding Rails",
        default_branch: "master",
        format: "markdown",
      )
    end
  end
end
