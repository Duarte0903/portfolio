import '../style/lang_card.css'

function LanguageCard(props) {
  const {imagePath, ...bullets} = props;

  return (
    <div className='language-card-container'>
      <img src={props.imagePath} className="language-logo" />

      <ul className='language-skills-list'>
        {Object.values(bullets).map((bp, index) => 
        (<li key={index} className='language-skill'>{bp}</li>))}
      </ul>
    </div>
  );
}

export default LanguageCard;