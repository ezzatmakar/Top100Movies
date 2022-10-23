# Schema for MongoDB

## User
```js
{
  _id: ObjectId,
  firstName: String,
  lastName: String.
  top100Movies: [{ //movies title, description and image url are demoralized as they will rarely change if ever, so it's a better option for viewing each user's top movies than using populate on the app level or lookups
    id: ObjectId,
    imageUrl: String,
    rank: Number, //range from 1 up to 100
    title?: String,
    description?: String
  }],
  isDeleted: Boolean, // default false for soft delete
  createdAt: Date,
  updateAt: Date,
}
```

## Movie

```js
{
    _id: ObjectId,
    posterPath: {
        url: String,
        title?: String,
        description?: String
    },
    adult: Boolean,
    overview: String,
    releaseDate: Date,
    genreIds: Number[],
    originalTitle: String,
    originalLanguage: String,
    title: String,
    backdropPath: {
        url: String,
        title?: String,
        description?: String
    },
    popularity: Number,
    voteCount: Number // Integer
    video: Boolean,
    voteAverage: Number,
    isDeleted: Boolean, // default false for soft delete
    createdAt: Date,
    updateAt: Date,
}
```