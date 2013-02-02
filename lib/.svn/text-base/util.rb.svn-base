class Util
  def self.formatted_random_string(pattern)
    out = ""
    pattern.each_char do |c|
      out << random_char_for(c)
    end
    out
  end

  def self.random_char_for(pattern_char)
    range_for(pattern_char).to_a.rand
  end

  def self.range_for(pattern_char)
    case pattern_char
    when 'A'
      "A".."Z"
    when '#'
      "0".."9"
    else
      [pattern_char]
    end
  end
end