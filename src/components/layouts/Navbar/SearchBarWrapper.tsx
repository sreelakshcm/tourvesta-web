import SearchBar from '@components/UI/inputComponent/Search';
import { DEFAULT_INPUT_CLASSNAMES } from '@constants/styles';

interface SearchBarWrapperProps<T extends { name: string }> {
  data?: T[];
  isMobile?: boolean;
}

const SearchBarWrapper = <T extends { name: string }>({
  data,
  isMobile,
}: SearchBarWrapperProps<T>): JSX.Element => (
    <div className={` ${isMobile ? 'w-full' : 'w-2/3 lg:w-1/2'}`}>
      <SearchBar
        placeholder="Search..."
        className={`${DEFAULT_INPUT_CLASSNAMES} ${
          isMobile ? 'w-full' : 'transition-all duration-300'
        }`}
        data={data}
      />
    </div>
  );

export default SearchBarWrapper;
