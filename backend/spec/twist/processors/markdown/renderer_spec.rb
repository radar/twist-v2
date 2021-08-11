require 'spec_helper'

module Twist
  module Markdown
    describe Renderer do
      let(:renderer) { Redcarpet::Markdown.new(described_class, fenced_code_blocks: true) }

      def render(element)
        Nokogiri::HTML(renderer.render(element))
      end

      it "can parse a paragraph" do
        paragraph = <<~INPUT
          Once upon a time...
          The end.
        INPUT
        output = render(paragraph)
        expect(output.css("p").text).to eq(paragraph.strip)
      end

      it "can parse a tip" do
        tip = <<~INPUT
          T> **The constraint request object**
          T>
          T> The `request` object passed in to the `matches?` call in any constraint is
          T> an `ActionDispatch::Request` object, the same kind of object that is available
          T> within your application's (and engine's) controllers.
          T>
          T> You can get other information out of this object as well, if you wish. For
          T> instance, you could access the Warden proxy object with an easy call to
          T> `request.env['warden']`, which you could then use to only allow routes for an
          T> authenticated user.
        INPUT

        output = render(tip)
        parsed_tip = output.css("div.tip")
        expect(parsed_tip.css("strong").text).to eq("The constraint request object")
        expect(parsed_tip.css("p").count).to eq(3)
      end

      it "can parse a warning" do
        warning = <<~INPUT
          W> **Don't do that!**
          W>
          W> Please keep all extremities clear of the whirring blades.
        INPUT

        output = render(warning)
        parsed_warning = output.css("div.warning")
        expect(parsed_warning.css("strong").text).to eq("Don't do that!")
        expect(parsed_warning.css("p").count).to eq(2)
      end

      it "can parse an error" do
        error = <<~INPUT
          E> **Something went wrong**
          E>
          E> Not going to tell you what.
        INPUT

        output = render(error)
        parsed_error = output.css("div.error")
        expect(parsed_error.css("strong").text).to eq("Something went wrong")
        expect(parsed_error.css("p").count).to eq(2)
      end

      it "can parse an information box" do
        information = <<~INPUT
          I> **Something you should know**
          I>
          I> This is an information box. Don't tell anyone.
        INPUT

        output = render(information)
        parsed_information = output.css("div.information")
        expect(parsed_information.css("strong").text).to eq("Something you should know")
        expect(parsed_information.css("p").count).to eq(2)
      end

      it "can parse a question box" do
        question = <<~INPUT
          Q> **Is there a question?**
          Q>
          Q> No?
        INPUT

        output = render(question)
        parsed_question = output.css("div.question")
        expect(parsed_question.css("strong").text).to eq("Is there a question?")
        expect(parsed_question.css("p").count).to eq(2)
      end

      it "can parse a discussion box" do
        discussion = <<~INPUT
          D> **Discussion area**
          D>
          D> Please, talk.
        INPUT

        output = render(discussion)
        parsed_discussion = output.css("div.discussion")
        expect(parsed_discussion.css("strong").text).to eq("Discussion area")
        expect(parsed_discussion.css("p").count).to eq(2)
      end

      it "can parse a exercise box" do
        exercise = <<~INPUT
          X> **Exercise!**
          X>
          X> One, and two, and three, and four!
        INPUT

        output = render(exercise)
        parsed_exercise = output.css("div.exercise")
        expect(parsed_exercise.css("strong").text).to eq("Exercise!")
        expect(parsed_exercise.css("p").count).to eq(2)
      end

      it "can parse an aside" do
        aside = <<~INPUT
          A> ## A simple aside
          A>
          A> Did you know that this is an aside? Please keep it on the DL.
        INPUT

        output = render(aside)
        parsed_aside = output.css("div.aside")
        expect(parsed_aside.css("h2").text).to eq("Pssst, over here!")
        expect(parsed_aside.css("p").count).to eq(2)
      end

      it "can parse a titleized code listing" do
        code = <<~INPUT
          {title=lib/subscribem/constraints/subdomain_required.rb,lang=ruby,line-numbers=on}
              module Subscribem
                module Constraints
                  class SubdomainRequired
                    def self.matches?(request)
                      request.subdomain.present? && request.subdomain != "www"
                    end
                  end
                end
              end
        INPUT

        # Two linebreaks with text is ultra important.
        # Regex used to locate and pre-process code listings uses two linebreaks and
        # text as a delimiter.

        output = render(code)
        parsed_code = output.css("div.code")
        expect(parsed_code.css("div.highlight")).not_to be_empty
        expect(parsed_code.css(".highlight .k").first.text).to eq("module")
      end

      it "maintains line breaks in code listing" do
        code = <<~INPUT
          {title=code.rb,lang=ruby,line-numbers=on}
              def some code
                #code goes here
              end

               def some_more_code
                # some more code goes here
              end
        INPUT

        output = render(code)
        parsed_code = output.css("div.code")
        expect(parsed_code.css("div.highlight")).not_to be_empty
        expect(parsed_code.css(".highlight").text).to include("\n\n")
      end

      it "can parse a titleized code listing with multiple underscores" do
        code = <<~INPUT
          {title=spec/controllers/accounts/books_controller_spec.rb,lang=ruby,line-numbers=on}
              module Subscribem
                module Constraints
                  class SubdomainRequired
                    def self.matches?(request)
                      request.subdomain.present? && request.subdomain != "www"
                    end
                  end
                end
              end
           Followed by some text
        INPUT

        # Two linebreaks with text is ultra important.
        # Regex used to locate and pre-process code listings uses two linebreaks and
        # text as a delimiter.

        output = render(code)
        expect(output.css("p").first.children.css("em").any?).to eq(false)
      end

      it "can parse a titleized code listing with a paragraph following" do
        code = <<~INPUT
          {title=lib/subscribem/constraints/subdomain_required.rb,lang=ruby,line-numbers=on}
              module Subscribem
                module Constraints
                  class SubdomainRequired
                    def self.matches?(request)
                      request.subdomain.present? && request.subdomain != "www"
                    end
                  end
                end
              end

          This is just some text. Nothing to be too concerned about.
        INPUT
        output = render(code)
        parsed_code = output.css("div.code")
        expect(parsed_code.css("div.highlight")).not_to be_empty
        expect(parsed_code.css(".highlight .k").first.text).to eq("module")

        expect(parsed_code.css("div.highlight").text.strip).to eq(<<~INPUT
          module Subscribem
            module Constraints
              class SubdomainRequired
                def self.matches?(request)
                  request.subdomain.present? && request.subdomain != "www"
                end
              end
            end
          end
        INPUT
        .strip)

        expect(output.css("p").last.text).to eq("This is just some text. Nothing to be too concerned about.")
      end

      it "can process a footnote" do
        footnote = <<~INPUT
          [^1]: Behold, a footnote.
        INPUT
        output = render(footnote)
        footnote = output.css(".footnote")
        expect(footnote.text.strip).to eq("Behold, a footnote.")
        expect(footnote.css("a[name=footnote_1]")).not_to be_empty
      end

      it "can process a multi-char" do
        footnote = <<~INPUT
          [^123]: Behold, a footnote.
        INPUT
        output = render(footnote)
        footnote = output.css(".footnote")
        expect(footnote.text.strip).to eq("Behold, a footnote.")
        expect(footnote.css("a[name=footnote_123]")).not_to be_empty
      end

      it "can process a footnote within a paragraph" do
        footnote_within_paragraph = %{Hey, check out this footnote[^1]}
        output = render(footnote_within_paragraph)
        expect(output.css("a sup").text).to eq("1")
      end

      it "can process a multi-char footnote within a paragraph" do
        footnote_within_paragraph = %{Hey, check out this footnote[^123]}
        output = render(footnote_within_paragraph)
        expect(output.css("a sup").text).to eq("1")
      end
    end
  end
end
