require 'rails_helper'
require 'capybara/rspec'

feature "Game Play", :type => :feature do

  background do
    visit "/training_game/all"
    expect(page).to_not have_css('div#resolutionModal.error')
    expect(page).to_not have_css('div#resolutionModal.success')

    click_on("button-help-modal-dismiss")

  end
  
  scenario "Losing one life after a wrong answer", :js => true do

    fill_in "airport_answer", :with => "Huhu\n" # Pressing ENTER in the end
    
    expect(page).to have_css('div#resolutionModal.error', :visible => true)
    expect(page).to have_css('#score-life-1.losing', :visible => true)
    expect(find('#score-board-score')).to have_content('0')
  end


  scenario "Gameover after 3 wrong attempts", :js => true do

    fill_in "airport_answer", :with => "Huhu1\n" # Pressing ENTER in the end
    expect(page).to have_css('div#resolutionModal.error', :visible => true)
    expect(page).to have_css('#score-life-1.losing', :visible => true)
    expect(find('#score-board-score')).to have_content('0')
    click_on("button-resolution-modal-dismiss")

    expect(page).to_not have_css('modal', :visible => true)
    fill_in "airport_answer", :with => "Huhu2\n" # Pressing ENTER in the end
    expect(page).to have_css('div#resolutionModal.error', :visible => true)
    expect(page).to have_css('#score-life-2.losing', :visible => true)
    expect(find('#score-board-score')).to have_content('0')
    click_on("button-resolution-modal-dismiss")

    expect(page).to_not have_css('modal', :visible => true)
    fill_in "airport_answer", :with => "Huhu3\n" # Pressing ENTER in the end
    expect(page).to have_css('#game-over-modal.error', :visible => true)
    expect(page).to have_css('#score-life-3.losing', :visible => true)
    expect(find('#score-board-score')).to have_content('0')
  end


  scenario "Maps zooms out every 5 seconds", :js => true do
    
    expect(find('#score-board-round-points')).to have_content('80')
    expect(page).to_not have_css('.modal')

    sleep(7)

    # After 7 seconds 
    expect(find('#score-board-round-points')).to have_content('75')
    expect(page).to_not have_css('.modal')

    sleep(5)

    # After 5 seconds 
    expect(find('#score-board-round-points')).to have_content('70')
    expect(page).to_not have_css('.modal')
  end

  scenario "Info modal pauses zoom out", :js => true do

    expect(find('#score-board-round-points')).to have_content('80')
    expect(page).to_not have_css('.modal')

    sleep(7)

    # After 7 seconds 
    expect(find('#score-board-round-points')).to have_content('75')
    expect(page).to_not have_css('.modal')

    page.find("#information-link").click

    expect(page).to have_css('#helpModal', :visible => true)
    expect(find('#score-board-round-points')).to have_content('75')
    
    sleep(5)

    # Nothing changed because the help modal is still on the screen
    expect(page).to have_css('#helpModal', :visible => true)
    expect(find('#score-board-round-points')).to have_content('75')

    click_on("button-help-modal-dismiss") # Resuming the game

    sleep(5)

    # After 5 seconds
    expect(find('#score-board-round-points')).to have_content('70')
    expect(page).to_not have_css('.modal')

  end

end
