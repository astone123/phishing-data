import * as React from 'react';

class Search extends React.Component<ISearchProps, { query: string }> {
  constructor(props: ISearchProps) {
    super(props);
    this.state = { query: props.query || '' };

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleQueryChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (this.props.notify) {
      this.props.notify({ query: this.state.query });
    }
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    this.setState({ query: target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleQueryChange}>
        <input
          autoFocus={true}
          type="search"
          placeholder="Filter by IP, Target, or URL"
          value={this.state.query || ''}
          onChange={this.onChange}
        />
      </form>
    );
  }
}

export default Search;
