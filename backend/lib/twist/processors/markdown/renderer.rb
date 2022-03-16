module Twist
  module Processors
    module Markdown
      class Renderer < Redcarpet::Render::HTML
        # rubocop:disable Metrics/MethodLength
        def paragraph(text)
          # Is special
          # 1. Anything starting with the TWAIDEQX
          # 2. Immediately followed by &gt;
          # 3. And any number of spaces (but leaving new lines)

          if text.gsub!(/^([TWAIDEQX])&gt;[ ]*/, '')
            special(text, Regexp.last_match(1))
          # Begins with the footnote markings: [^footnote]:
          elsif footnote_prefix_regex.match?(text.strip)
            footnote(text)
          else
            # inline footnotes
            footnote_regex = /\[\^([^\]]*)\]/
            if footnote_regex.match(text)
              text = text.gsub(footnote_regex) do
                @footnote_count += 1
                "<a href='#footnote_#{Regexp.last_match(1)}'><sup>#{@footnote_count}</sup></a>"
              end
            end

            "<p>" + text + "</p>"
          end
        end
        # rubocop:enable Metrics/MethodLength

        def footnote(text)
          text = text.gsub(footnote_prefix_regex, '')
          "<div class='footnote'><a name='footnote_#{Regexp.last_match(1)}' href='#'></a>#{text}</div>"
        end

        def block_code(code, language)
          language = 'text' if language == 'plain'
          code = Pygments.highlight(code, lexer: language)
          "<div class='code'>#{code}</div>"
        end

        def special(text, type)
          types = {
            'T' => 'tip',
            'W' => 'warning',
            'A' => 'aside',
            'I' => 'information',
            'D' => 'discussion',
            'E' => 'error',
            'X' => 'exercise',
            'Q' => 'question',
          }


          "<div class='#{types[type]}'>#{MarkdownProcessor.process(text)}</div>"
        end

        def preprocess(full_document)
          @footnote_count = 0
          full_document = full_document.gsub(/^({[^}]*})$\n((?:(?:(?=\s).*)\n?)*)/) do
            preprocess_code(Regexp.last_match(1), Regexp.last_match(2))
          end

          # ARE YOU RETURNING A STRING HERE?!
          # If you don't, Redcarpet will raise a segfault
          full_document
        end

        def postprocess(full_document)
          html = Nokogiri::HTML(full_document)
          html.css("h2, h3").each_with_index do |header, index|
            header['class'] = 'section_title'
            header['id'] = "header_#{index}"
          end
          html.to_html
        end

        private

        def footnote_prefix_regex
          /^\[\^([^\]]*)\]:\s*/
        end

        def preprocess_code(details, code)
          output = ""
          details = Hash[details[1..-2].split(",").map do |detail|
            detail.split("=")
          end]

          output = "**#{details['title'].gsub('_', '\\_')}**\n\n" if details['title']

          code = code.split("\n").map { |l| l.gsub(/\A\s{4}/, '') }.join("\n")

          output + "```#{details['lang']}\n#{code}\n```\n\n"
        end
      end
    end
  end
end
